export default function About() {
  return (
    <section id="about" style={{
      background: "var(--bg-secondary)",
      padding: "6rem 2rem"
    }}>
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center"
      }}>
        <h2>About Me</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginTop: "3rem"
        }}>
          <div style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ color: "var(--accent)" }}>Current Role</h3>
            <p>AI/ML Researcher @ Fraunhofer FOKUS</p>
          </div>
          <div style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ color: "var(--accent)" }}>Previous</h3>
            <p>Software Engineer @ KIDA Studios</p>
          </div>
          <div style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ color: "var(--accent)" }}>Education</h3>
            <p>Master's in Computer Science (Berlin)</p>
          </div>
          <div style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)"
          }}>
            <h3 style={{ color: "var(--accent)" }}>Focus Areas</h3>
            <p>ML systems, distributed systems, mobile</p>
          </div>
        </div>
      </div>
    </section>
  );
}
