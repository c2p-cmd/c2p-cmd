import { Fragment, useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";

const CHATBOT_URL = import.meta.env.VITE_CHAT_URL;

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

type MarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "code"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi, I am Sharan's portfolio assistant. Ask me about his work, projects, education, or technical background.",
  },
];

function isSafeUrl(url: string) {
  try {
    const parsed = new URL(url, window.location.href);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    const token = match[0];

    if (token.startsWith("`")) {
      nodes.push(<code key={`${match.index}-code`}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={`${match.index}-strong`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      nodes.push(<em key={`${match.index}-em`}>{token.slice(1, -1)}</em>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch && isSafeUrl(linkMatch[2])) {
        nodes.push(
          <a
            href={linkMatch[2]}
            key={`${match.index}-link`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {linkMatch[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;
  let codeLines: string[] = [];
  let inCodeBlock = false;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", ordered: listOrdered, items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushList();

      if (inCodeBlock) {
        blocks.push({ type: "code", text: codeLines.join("\n") });
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 1 | 2 | 3,
        text: headingMatch[2],
      });
      continue;
    }

    const bulletMatch = line.match(/^\s*[-*]\s+(.+)$/);
    const orderedMatch = line.match(/^\s*\d+\.\s+(.+)$/);
    if (bulletMatch || orderedMatch) {
      flushParagraph();
      const ordered = Boolean(orderedMatch);
      if (listItems.length > 0 && listOrdered !== ordered) {
        flushList();
      }
      listOrdered = ordered;
      listItems.push((bulletMatch ?? orderedMatch)?.[1] ?? "");
      continue;
    }

    const quoteMatch = line.match(/^>\s?(.+)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      blocks.push({ type: "blockquote", text: quoteMatch[1] });
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  if (inCodeBlock) {
    blocks.push({ type: "code", text: codeLines.join("\n") });
  }

  flushParagraph();
  flushList();
  return blocks;
}

function MarkdownMessage({ content }: { content: string }) {
  const blocks = parseMarkdown(content);

  return (
    <div className="chatbot-markdown">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3";
          return <HeadingTag key={index}>{renderInlineMarkdown(block.text)}</HeadingTag>;
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={`${index}-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>{block.text}</code>
            </pre>
          );
        }

        if (block.type === "blockquote") {
          return <blockquote key={index}>{renderInlineMarkdown(block.text)}</blockquote>;
        }

        return (
          <p key={index}>
            {renderInlineMarkdown(block.text).map((node, nodeIndex) => (
              <Fragment key={nodeIndex}>{node}</Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      if (!CHATBOT_URL) {
        throw new Error("VITE_CHAT_URL is not configured");
      }

      const result = await fetch(CHATBOT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!result.ok) {
        throw new Error(`Chatbot request failed with status ${result.status}`);
      }

      const data: unknown = await result.json();
      const response =
        data && typeof data === "object" && "response" in data
          ? (data as { response?: unknown }).response
          : null;

      if (typeof response !== "string") {
        throw new Error("Chatbot response did not include a string response field");
      }

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response,
        },
      ]);
    } catch (requestError) {
      console.error(requestError);
      setError("I could not reach the chatbot right now. Please try again in a moment.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={`chatbot-shell ${isOpen ? "chatbot-shell--open" : ""}`}>
      {isOpen && (
        <aside aria-label="Portfolio chatbot" className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <span className="chatbot-eyebrow">Ask about Sharan</span>
              <h2>Portfolio Chat</h2>
            </div>
            <button
              aria-label="Close chatbot"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                className={`chatbot-message chatbot-message--${message.role}`}
                key={message.id}
              >
                <MarkdownMessage content={message.content} />
              </div>
            ))}

            {isSending && (
              <div className="chatbot-message chatbot-message--assistant">
                <div className="chatbot-typing" aria-label="Chatbot is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {error && <p className="chatbot-error">{error}</p>}

          <form className="chatbot-form" onSubmit={sendMessage}>
            <textarea
              aria-label="Message for portfolio chatbot"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Ask about projects, skills, work..."
              ref={inputRef}
              rows={1}
              value={input}
            />
            <button
              aria-label="Send message"
              disabled={!input.trim() || isSending}
              type="submit"
            >
              <FaPaperPlane />
            </button>
          </form>
        </aside>
      )}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close portfolio chatbot" : "Open portfolio chatbot"}
        className="chatbot-launcher"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      <style>{`
        .chatbot-shell {
          bottom: 1.5rem;
          position: fixed;
          right: 1.5rem;
          z-index: 1200;
        }

        .chatbot-panel {
          background:
            radial-gradient(circle at top left, rgba(243, 190, 122, 0.28), transparent 34%),
            linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(248, 249, 250, 0.98));
          border: 1px solid rgba(56, 82, 180, 0.16);
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(26, 26, 46, 0.22);
          display: flex;
          flex-direction: column;
          height: min(680px, calc(100vh - 7rem));
          margin-bottom: 1rem;
          overflow: hidden;
          width: min(420px, calc(100vw - 3rem));
        }

        .chatbot-header {
          align-items: center;
          background: linear-gradient(135deg, var(--color-primary), #213170);
          color: white;
          display: flex;
          justify-content: space-between;
          padding: 1.1rem 1.2rem;
        }

        .chatbot-eyebrow {
          color: rgba(255, 255, 255, 0.72);
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .chatbot-header h2 {
          color: white;
          font-size: 1.1rem;
          margin: 0.2rem 0 0;
        }

        .chatbot-close,
        .chatbot-launcher,
        .chatbot-form button {
          align-items: center;
          border: 0;
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
        }

        .chatbot-close {
          background: rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          color: white;
          height: 2rem;
          width: 2rem;
        }

        .chatbot-messages {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 0.8rem;
          overflow-y: auto;
          padding: 1rem;
        }

        .chatbot-message {
          border-radius: 18px;
          max-width: 88%;
          padding: 0.78rem 0.9rem;
        }

        .chatbot-message--assistant {
          align-self: flex-start;
          background: white;
          border: 1px solid var(--border);
          box-shadow: 0 8px 22px rgba(26, 26, 46, 0.08);
        }

        .chatbot-message--user {
          align-self: flex-end;
          background: var(--color-primary);
          color: white;
        }

        .chatbot-message--user .chatbot-markdown,
        .chatbot-message--user .chatbot-markdown p,
        .chatbot-message--user .chatbot-markdown li {
          color: white;
        }

        .chatbot-markdown {
          color: var(--text-secondary);
          font-size: 0.92rem;
        }

        .chatbot-markdown > * + * {
          margin-top: 0.55rem;
        }

        .chatbot-markdown p {
          color: inherit;
          line-height: 1.55;
          margin: 0;
        }

        .chatbot-markdown h1,
        .chatbot-markdown h2,
        .chatbot-markdown h3 {
          color: var(--text-primary);
          font-size: 1rem;
          margin: 0;
        }

        .chatbot-markdown ul,
        .chatbot-markdown ol {
          margin: 0;
          padding-left: 1.2rem;
        }

        .chatbot-markdown li {
          color: inherit;
          line-height: 1.5;
          margin: 0.18rem 0;
        }

        .chatbot-markdown a {
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 0.16em;
        }

        .chatbot-markdown code {
          background: rgba(56, 82, 180, 0.1);
          border-radius: 0.35rem;
          color: var(--color-primary);
          font-family: var(--font-mono);
          font-size: 0.84em;
          padding: 0.1rem 0.28rem;
        }

        .chatbot-markdown pre {
          background: #11182f;
          border-radius: 12px;
          color: white;
          overflow-x: auto;
          padding: 0.75rem;
        }

        .chatbot-markdown pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }

        .chatbot-markdown blockquote {
          border-left: 3px solid var(--color-accent);
          margin: 0;
          padding-left: 0.75rem;
        }

        .chatbot-typing {
          display: flex;
          gap: 0.28rem;
          padding: 0.25rem;
        }

        .chatbot-typing span {
          animation: chatbot-pulse 1s infinite ease-in-out;
          background: var(--color-secondary);
          border-radius: 999px;
          height: 0.42rem;
          width: 0.42rem;
        }

        .chatbot-typing span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .chatbot-typing span:nth-child(3) {
          animation-delay: 0.3s;
        }

        .chatbot-error {
          background: rgba(240, 141, 57, 0.12);
          color: var(--color-warning);
          font-size: 0.85rem;
          margin: 0 1rem 0.85rem;
          padding: 0.6rem 0.75rem;
          border-radius: 12px;
        }

        .chatbot-form {
          align-items: flex-end;
          background: rgba(255, 255, 255, 0.78);
          border-top: 1px solid var(--border);
          display: flex;
          gap: 0.7rem;
          padding: 0.85rem;
        }

        .chatbot-form textarea {
          background: white;
          border: 1px solid rgba(56, 82, 180, 0.2);
          border-radius: 16px;
          color: var(--text-primary);
          flex: 1;
          font: inherit;
          max-height: 8rem;
          min-height: 2.75rem;
          outline: none;
          padding: 0.76rem 0.85rem;
          resize: vertical;
        }

        .chatbot-form textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px var(--accent-glow);
        }

        .chatbot-form button {
          background: var(--color-accent);
          border-radius: 16px;
          color: #211408;
          height: 2.75rem;
          transition: transform 0.2s ease, opacity 0.2s ease;
          width: 2.75rem;
        }

        .chatbot-form button:not(:disabled):hover {
          transform: translateY(-2px);
        }

        .chatbot-form button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .chatbot-launcher {
          background:
            linear-gradient(135deg, var(--color-accent), #ffd69e 42%, var(--color-primary));
          border-radius: 999px;
          box-shadow: 0 16px 42px rgba(56, 82, 180, 0.32);
          color: #17214b;
          font-size: 1.35rem;
          height: 4rem;
          margin-left: auto;
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          width: 4rem;
        }

        .chatbot-launcher::before {
          border: 1px solid rgba(56, 82, 180, 0.22);
          border-radius: inherit;
          content: "";
          inset: -7px;
          position: absolute;
        }

        .chatbot-launcher:hover {
          box-shadow: 0 20px 52px rgba(56, 82, 180, 0.38);
          transform: translateY(-2px);
        }

        @keyframes chatbot-pulse {
          0%, 80%, 100% {
            opacity: 0.35;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        @media (max-width: 520px) {
          .chatbot-shell {
            bottom: 1rem;
            right: 1rem;
          }

          .chatbot-shell--open {
            left: 1rem;
          }

          .chatbot-panel {
            height: min(620px, calc(100vh - 6.25rem));
            width: 100%;
          }

          .chatbot-launcher {
            height: 3.55rem;
            width: 3.55rem;
          }
        }
      `}</style>
    </div>
  );
}
