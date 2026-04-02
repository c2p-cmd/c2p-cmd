import { Canvas } from "@react-three/fiber";
import TechCloud from "./TechCloud";

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--bg-secondary)",
        padding: "6rem 2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2>About Me</h2>

        {/* Existing Info Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 style={{ color: "var(--accent)" }}>Current Role</h3>
            <p>AI/ML Researcher @ Fraunhofer FOKUS</p>
          </div>
          <div
            style={{
              background: "var(--bg-card)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 style={{ color: "var(--accent)" }}>Previous</h3>
            <p>Software Engineer @ KIDA Studios</p>
          </div>
          <div
            style={{
              background: "var(--bg-card)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 style={{ color: "var(--accent)" }}>Education</h3>
            <p>Master's in Computer Science</p>
          </div>
          <div
            style={{
              background: "var(--bg-card)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 style={{ color: "var(--accent)" }}>Focus Areas</h3>
            <p>ML systems, distributed systems, mobile</p>
          </div>
        </div>

        {/* 3D Tech Stack Cloud Section */}
        <div style={{ marginTop: "5rem" }}>
          <h3 style={{ marginBottom: "2rem", fontSize: "1.8rem" }}>
            Tech Stack
          </h3>
          <div
            style={{
              height: "500px",
              width: "100%",
              background: "var(--bg-card)",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
              position: "relative",
              overflow: "hidden", // Ensures nothing bleeds out of the card
            }}
          >
            {/* cursor: "grab" gives the user a hint that it might be interactive.
              If you add OrbitControls later, this makes it feel native.
            */}
            <Canvas
              camera={{ position: [0, 0, 9], fov: 50 }}
              style={{ cursor: "grab" }}
            >
              <TechCloud radius={3.5} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
