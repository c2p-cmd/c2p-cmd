const projects = [
  {
    title: "Agentic AI Debate Simulator",
    desc: "Multi-agent orchestration system with tool use for simulating complex debates",
    tags: ["AI", "Multi-agent", "LLM"]
  },
  {
    title: "ScrollCast",
    desc: "Full-stack news aggregation platform with real-time updates",
    tags: ["Full-stack", "Real-time", "News"]
  },
];

export default function Projects() {
  return (
    <section 
      id="projects" 
      style={{
        background: "var(--bg-primary)",
        padding: "6rem 2rem",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Projects</h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginTop: "3rem"
        }}>
          {projects.map((p, i) => (
            <div 
              key={i} 
              style={{
                background: "var(--bg-card)",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--border)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
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
              <h3>{p.title}</h3>
              <p style={{ marginBottom: "1rem" }}>{p.desc}</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {p.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      fontWeight: "500"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}