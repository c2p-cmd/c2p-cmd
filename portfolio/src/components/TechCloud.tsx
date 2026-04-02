import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { techStack } from "../utils/techData";

export default function TechCloud({ radius = 3 }) {
  const groupRef = useRef<THREE.Group>(null);

  // Distribute items evenly on a sphere
  const positions = useMemo(() => {
    const count = techStack.length;
    const pos = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Scale by our desired sphere radius
      pos.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return pos;
  }, [radius]);

  // Slowly rotate the entire cloud
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {techStack.map((url, i) => (
        <group key={i} position={positions[i]}>
          <Html
            transform
            sprite // 'sprite' makes the HTML elements always face the camera
            distanceFactor={10} // Scales the elements based on camera distance
            style={{
              pointerEvents: "none", // Prevents badges from blocking scroll
              userSelect: "none",
            }}
          >
            <img
              src={url}
              alt="Tech Badge"
              style={{
                height: "30px", // Adjust based on how large you want the shields
                filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.3))",
              }}
            />
          </Html>
        </group>
      ))}
    </group>
  );
}
