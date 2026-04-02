export default function Contact() {
  return (
    <section 
      id="contact" 
      style={{
        background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
        padding: "6rem 2rem",
        textAlign: "center",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Get In Touch</h2>
        <p style={{ fontSize: "1.125rem", marginBottom: "2rem" }}>
          Interested in working together or have questions? Feel free to reach out!
        </p>
        
        <a 
          href="mailto:sharanthakur2001@gmail.com"
          style={{
            display: "inline-block",
            padding: "1rem 3rem",
            background: "var(--accent)",
            color: "white",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "1.125rem",
            boxShadow: "var(--shadow-lg)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 14px 44px rgba(99, 102, 241, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          }}
        >
          sharanthakur2001@gmail.com
        </a>
      </div>
    </section>
  );
}