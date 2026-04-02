import { useGLTF } from "@react-three/drei";
import modelPath from "../assets/xbox-controller/xbxox_export.glb?url";

export default function Controller() {
  const { scene, nodes } = useGLTF(modelPath);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <group>
      <primitive object={scene} scale={1.5} />

      {/* A Button - Scroll to About */}
      {nodes.a_button && (
        <mesh
          position={nodes.a_button.position}
          scale={nodes.a_button.scale}
          rotation={nodes.a_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("about");
          }}
        >
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* B Button - Scroll to Work */}
      {nodes.b_button && (
        <mesh
          position={nodes.b_button.position}
          scale={nodes.b_button.scale}
          rotation={nodes.b_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("work");
          }}
        >
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* X Button - Scroll to Education */}
      {nodes.x_button && (
        <mesh
          position={nodes.x_button.position}
          scale={nodes.x_button.scale}
          rotation={nodes.x_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("education");
          }}
        >
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Y Button - Scroll to Projects */}
      {nodes.y_button && (
        <mesh
          position={nodes.y_button.position}
          scale={nodes.y_button.scale}
          rotation={nodes.y_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("projects");
          }}
        >
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Xbox Button - Scroll to Hero/Top */}
      {nodes.xbox_button && (
        <mesh
          position={nodes.xbox_button.position}
          scale={nodes.xbox_button.scale}
          rotation={nodes.xbox_button.rotation}
          onClick={(e) => {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Menu Right - Scroll to Contact */}
      {nodes.menu_right && (
        <mesh
          position={nodes.menu_right.position}
          scale={nodes.menu_right.scale}
          rotation={nodes.menu_right.rotation}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo("contact");
          }}
        >
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  );
}
