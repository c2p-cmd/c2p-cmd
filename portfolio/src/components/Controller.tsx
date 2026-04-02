import React from "react";
import { useGLTF } from "@react-three/drei";
import modelPath from "../assets/xbox-controller/xbxox_export.glb?url";

export default function Controller() {
  const { scene, nodes } = useGLTF(modelPath);
  const [hovered, setHovered] = React.useState(false);

  // Change cursor to pointer when hovering over a button
  React.useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Moved scale={2} to the parent group so everything scales together!
    <group scale={2}>
      <primitive object={scene} />

      {/* A Button - Scroll to About */}
      {nodes.a_button && (
        <mesh
          position={nodes.a_button.position}
          rotation={nodes.a_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("about");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          {/* Adjusted args if needed based on the new parent scale */}
          <sphereGeometry args={[0.12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* B Button - Scroll to Work */}
      {nodes.b_button && (
        <mesh
          position={nodes.b_button.position}
          rotation={nodes.b_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("work");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* X Button - Scroll to Education */}
      {nodes.x_button && (
        <mesh
          position={nodes.x_button.position}
          rotation={nodes.x_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("education");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Y Button - Scroll to Projects */}
      {nodes.y_button && (
        <mesh
          position={nodes.y_button.position}
          rotation={nodes.y_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("projects");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Xbox Button - Scroll to Hero/Top */}
      {nodes.xbox_button && (
        <mesh
          position={nodes.xbox_button.position}
          rotation={nodes.xbox_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Menu Right - Scroll to Contact */}
      {nodes.menu_right && (
        <mesh
          position={nodes.menu_right.position}
          rotation={nodes.menu_right.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("contact");
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  );
}

