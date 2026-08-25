import { Canvas } from "@react-three/fiber";
import TechCloud from "./TechCloud";

// Isolated in its own module (and lazy-loaded from About) so the heavy
// three.js / react-three-fiber dependency graph ships as a separate,
// visibility-gated chunk instead of bloating the main bundle.
export default function TechCloudCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 50 }}
      style={{ cursor: "grab" }}
    >
      <TechCloud radius={3.3} />
    </Canvas>
  );
}
