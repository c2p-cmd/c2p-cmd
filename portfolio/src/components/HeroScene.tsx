import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import React, { Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import Controller from "./Controller";

function Scene() {
  const ref = React.useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Float rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={ref} scale={isMobile ? 1.2 : 1}>
        <Controller />
      </group>
    </Float>
  );
}

// Isolated in its own module (and lazy-loaded from Hero) so the heavy
// three.js / react-three-fiber / drei dependency graph ships as a
// separate, non-blocking chunk instead of bloating the main bundle.
export default function HeroScene() {
  const [cameraZ] = useState(() => (window.innerWidth <= 768 ? 4 : 5));

  return (
    <Canvas
      camera={{
        position: [0, 0, cameraZ],
        fov: 45,
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
