import { Canvas } from "@react-three/fiber";
import TechCloud from "./TechCloud";

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--bg-secondary)",
        padding: "3rem 2rem 3rem",
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
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <h3 style={{ color: "var(--accent)", margin: 0 }}>Current Role</h3>
            <p
              style={{
                fontWeight: "600",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              AI/ML Researcher @ Fraunhofer FOKUS
            </p>
            <p style={{ fontSize: "0.95rem", margin: 0 }}>
              Working in the Software-based Networks (NGNI) unit, focusing on
              applying machine learning to next-generation network
              infrastructures.
            </p>
          </div>

          <div
            style={{
              background: "var(--bg-card)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <h3 style={{ color: "var(--accent)", margin: 0 }}>Education</h3>
            <p
              style={{
                fontWeight: "600",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Master's in Computer Science
            </p>
            <p style={{ fontSize: "0.95rem", margin: 0 }}>
              Pursuing an MEng at GISMA Institute of Applied Sciences.
            </p>
          </div>

          <div
            style={{
              background: "var(--bg-card)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <h3 style={{ color: "var(--accent)", margin: 0 }}>Focus Areas</h3>
            <div
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <span>
                <strong>ML Systems:</strong> Edge deployment, CV, and Apple MLX.
              </span>
              <span>
                <strong>Networks:</strong> 5G, SDR, and GNU Radio.
              </span>
              <span>
                <strong>Mobile:</strong> Native iOS & SwiftUI.
              </span>
            </div>
          </div>

          <div
            style={{
              background: "var(--bg-card)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <h3 style={{ color: "var(--accent)", margin: 0 }}>Hobbies</h3>
            <p
              style={{
                fontWeight: "600",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Gaming & Tech
            </p>
            <p style={{ fontSize: "0.95rem", margin: 0 }}>
              When I'm not at a hackathon, you can usually find me reading
              manga, exploring the Apple ecosystem, or gaming on my ROG Ally.
            </p>
          </div>
        </div>

        {/* 3D Tech Stack Cloud Section */}
        <div style={{ marginTop: "5rem" }}>
          <h3 style={{ marginBottom: "2rem", fontSize: "1.8rem" }}>
            Tech Stack
          </h3>
          <div className="tech-cloud-container">
            {/* cursor: "grab" gives the user a hint that it might be interactive.
              If you add OrbitControls later, this makes it feel native.
            */}
            <Canvas
              camera={{ position: [0, 0, 9.5], fov: 50 }}
              style={{ cursor: "grab" }}
            >
              <TechCloud radius={3.3} />
            </Canvas>
          </div>
        </div>
      </div>

      <style>{`
        .tech-cloud-container {
          height: 550px;
          width: 100%;
          background: var(--bg-card);
          border-radius: 12px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .tech-cloud-container {
            height: 450px;
          }
        }

        @media (max-width: 480px) {
          .tech-cloud-container {
            height: 350px;
          }
        }
      `}</style>
    </section>
  );
}
