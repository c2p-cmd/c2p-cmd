import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Controller from "./Controller";

function Scene() {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    const scrollY = window.scrollY;
    if (ref.current) {
      ref.current.rotation.y = scrollY * 0.003;
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
  const { scrollYProgress } = useScroll();
  
  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const nameY = useTransform(scrollYProgress, [0, 0.15], [0, -200]);

  return (
    <div 
      style={{ 
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
        zIndex: 0
      }}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        alignItems: "center",
        padding: "0 4rem",
        gap: "2rem",
        maxWidth: "1600px",
        margin: "0 auto"
      }}>
        <div style={{ 
          position: "relative",
          height: "600px",
          width: "100%"
        }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        <motion.div 
          style={{ 
            opacity: nameOpacity,
            scale: nameScale,
            y: nameY,
            textAlign: "left",
            position: "relative",
            zIndex: 10
          }}
        >
          <motion.h1 
            style={{ 
              marginBottom: "1rem",
              fontSize: "clamp(3rem, 6vw, 5rem)"
            }}
          >
            Sharan Thakur
          </motion.h1>
          <motion.p 
            style={{ 
              fontSize: "1.5rem", 
              color: "var(--text-secondary)",
              marginBottom: "2rem" 
            }}
          >
            AI/ML Researcher & Software Engineer
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}