import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import Controller from "./Controller";
import sharanPhoto from "../assets/SharanPhoto3.jpg";

function Scene() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={ref}>
        <Controller />
      </group>
    </Float>
  );
}

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative",
      background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)"
    }}>
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: "4rem",
        alignItems: "center",
        zIndex: 1
      }}>
        <div style={{ textAlign: "left" }}>
          <h1 style={{ marginBottom: "1rem" }}>Sharan Thakur</h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "2rem", color: "var(--text-secondary)" }}>
            AI/ML Researcher & Software Engineer
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#about" style={{
              padding: "0.75rem 2rem",
              background: "var(--accent)",
              color: "white",
              borderRadius: "8px",
              fontWeight: "500"
            }}>
              About Me
            </a>
            <a href="#contact" style={{
              padding: "0.75rem 2rem",
              background: "transparent",
              border: "2px solid var(--accent)",
              color: "var(--accent)",
              borderRadius: "8px",
              fontWeight: "500"
            }}>
              Contact
            </a>
          </div>
        </div>

        <div style={{
          position: "relative",
          width: "100%",
          height: "500px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "var(--shadow-lg)"
        }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
          
          <div style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid var(--accent)",
            boxShadow: "var(--shadow-lg)"
          }}>
            <img 
              src={sharanPhoto} 
              alt="Sharan Thakur" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
