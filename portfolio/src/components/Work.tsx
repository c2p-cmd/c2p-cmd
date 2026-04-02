export default function Work() {
  return (
    <section id="work" style={{
      background: "var(--bg-secondary)",
      padding: "6rem 2rem"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Work Experience</h2>
        
        <div style={{ marginTop: "3rem" }}>
          <div style={{
            position: "relative",
            paddingLeft: "2rem",
            borderLeft: "2px solid var(--accent)",
            marginBottom: "2rem"
          }}>
            <div style={{
              position: "absolute",
              left: "-6px",
              top: "0",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "var(--accent)"
            }} />
            <div style={{
              background: "var(--bg-card)",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "var(--shadow)"
            }}>
              <h3>AI/ML Researcher</h3>
              <p style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Fraunhofer FOKUS</p>
              <p>Developing machine learning systems and conducting research in AI applications</p>
            </div>
          </div>

          <div style={{
            position: "relative",
            paddingLeft: "2rem",
            borderLeft: "2px solid var(--accent)"
          }}>
            <div style={{
              position: "absolute",
              left: "-6px",
              top: "0",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "var(--accent)"
            }} />
            <div style={{
              background: "var(--bg-card)",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "var(--shadow)"
            }}>
              <h3>Software Engineer</h3>
              <p style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>KIDA Studios</p>
              <p>Built and maintained software applications with focus on mobile development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
