import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

function Sphere({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = Math.sin(time * 1.5 + position[0] * 0.5) * 0.1 + 0.9;
    const targetScale = hovered ? 1.5 : 1.0;
    meshRef.current.scale.lerp(
      new Vector3(targetScale, targetScale, targetScale).multiplyScalar(pulse),
      0.1
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(event) => (event.stopPropagation(), setHovered(true))}
      onPointerOut={(event) => setHovered(false)}
      scale={1}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "hotpink" : "lightblue"}
        metalness={0.4}
        roughness={0.3}
        envMapIntensity={0.9}
      />
    </mesh>
  );
}

export default function Tutorial() {
  const N = 10; // Grid size (10x10)
  const spacing = 1.5; // Space between spheres
  const offset = ((N - 1) * spacing) / 2; // Offset to center the grid

  // Create positions for 100 spheres in a 10x10 grid
  const spheres = useMemo(() => {
    const temp = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        temp.push([i * spacing - offset, j * spacing - offset, 0]); // Position on xy-plane
      }
    }
    return temp;
  }, [N, spacing, offset]);

  return (
    <S.TutorialContainer>
      <Canvas camera={{ position: [0, 0, 15] }}> {/* Reset camera slightly */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} intensity={1.5} />
        {spheres.map((pos, i) => (
          <Sphere key={i} position={pos} />
        ))}
        <OrbitControls /> {/* Removed constraints */}
      </Canvas>
    </S.TutorialContainer>
  );
}
