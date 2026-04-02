export default function Education() {
  return (
    <section id="education" style={{
      background: "var(--bg-primary)",
      padding: "6rem 2rem"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Education</h2>
        
        <div style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            background: "var(--bg-card)",
            padding: "2rem 3rem",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)",
            textAlign: "center"
          }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Master's in Computer Science</h3>
            <p style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Berlin, Germany</p>
            <p>Specialized in Machine Learning and Distributed Systems</p>
          </div>
        </div>
      </div>
    </section>
  );
}
