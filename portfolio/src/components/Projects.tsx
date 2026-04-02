import projectsScreenshot from "../assets/Screenshot 2026-04-02 at 20.25.20.png";

interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string | string[];
  img?: string;
}

interface Research {
  title: string;
  desc: string;
  link: string;
}

const projectList: Project[] = [
  {
    title: "Agentic AI Debate Simulator",
    desc: "Multi-agent orchestration system with tool use for simulating debates",
    tags: ["AI", "Multi-agent", "LLM"],
    link: "https://github.com/c2p-cmd/win_my_argument",
    img: "https://raw.githubusercontent.com/c2p-cmd/win_my_argument/master/screenshots/Screenshot%202026-04-02%20at%2017.54.11.png",
  },
  {
    title: "ScrollCast",
    desc: "Full-stack news aggregation platform with real-time updates",
    tags: ["Full-stack", "Real-time", "News"],
    link: [
      "https://github.com/c2p-cmd/scroll_cast",
      "https://www.youtube.com/watch?v=UjMPYivrAcI",
    ],
    img: "https://raw.githubusercontent.com/c2p-cmd/scroll_cast/master/Screenshot%202025-09-21%20at%2015.58.30.png",
  },
  {
    title: "Image Generative Models with MLX",
    desc: "Trained and deployed Image Generative models on Apple Silicone",
    tags: ["On-Device Inference", "GenAI"],
    link: [
      "https://github.com/c2p-cmd/all_about_gans",
      "https://www.youtube.com/watch?v=-rIP5dT_nKY",
    ],
    img: projectsScreenshot,
  },
];

const researchList: Research[] = [
  {
    title:
      "Evaluating Apple's MLX Framework for Machine Learning: A Comparative Study of K-Means",
    desc: "Conducted experimental evaluation of Apple’s MLX framework for machine learning workloads, benchmarking K-Means algorithm and analyzing GPU acceleration performance on Apple Silicon.",
    link: "https://doi.org/10.6084/m9.figshare.30574280",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        background: "var(--bg-primary)",
        padding: "3rem 2rem 3rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Projects & Research</h2>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}
        >
          {/* Projects Section */}
          <div>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "var(--accent)",
              }}
            >
              Featured Projects
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {projectList.map((p, index) => (
                <div
                  key={index}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow)";
                  }}
                >
                  {p.img && (
                    <div
                      style={{
                        width: "100%",
                        height: "160px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={p.img}
                        alt={`${p.title} thumbnail`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                          color: "white",
                          padding: "0.75rem",
                          fontSize: "0.9rem",
                          textAlign: "center",
                          fontWeight: "500",
                        }}
                      >
                        {p.title}
                      </div>
                    </div>
                  )}
                  <div style={{ padding: "1.5rem" }}>
                    <h4
                      style={{
                        marginBottom: "0.75rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {p.title}
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        marginBottom: "1rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {p.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                        width: "100%",
                      }}
                    >
                      {p.tags.map((tag, j) => (
                        <span
                          key={j}
                          style={{
                            flexGrow: 1,
                            textAlign: "center",
                            padding: "0.25rem 0.6rem",
                            background: "var(--accent-glow)",
                            color: "var(--accent)",
                            borderRadius: "15px",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                    >
                      {Array.isArray(p.link) ? (
                        p.link.map((link, idx) => (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              flexGrow: 1,
                              textAlign: "center",
                              padding: "0.4rem 0.8rem",
                              background: "var(--accent)",
                              color: "white",
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {link.includes("github")
                              ? "View Project"
                              : link.includes("youtube")
                                ? "Watch Demo"
                                : link.replace("https://", "")}
                          </a>
                        ))
                      ) : (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            flexGrow: 1,
                            textAlign: "center",
                            padding: "0.4rem 0.8rem",
                            background: "var(--accent)",
                            color: "white",
                            borderRadius: "6px",
                            fontSize: "0.8rem",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                          }}
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Section */}
          <div>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "var(--accent)",
              }}
            >
              Research & Publications
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {researchList.map((r, index) => (
                <div
                  key={index}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow)",
                    border: "1px solid var(--border)",
                    padding: "1.5rem",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow)";
                  }}
                >
                  <h4
                    style={{
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {r.title}
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {r.desc}
                  </p>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1.25rem",
                      background: "var(--accent)",
                      color: "white",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Read Paper →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
