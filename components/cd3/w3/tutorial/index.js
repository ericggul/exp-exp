import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars, Sky } from "@react-three/drei";
import { useRef } from "react";

function Sphere({ position }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Calculate unique phase based on position to make spheres pulse differently
    const phase = (position[0] + position[1] + position[2]) * 0.3;
    // Scale between 0.8 and 1.2 using sin wave
    const scale = 1 + Math.sin(time * 2 + phase) * 1.0;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="orange"
        roughness={0.2} // Reduced roughness for more reflections
        metalness={0.8} // Increased metalness for more reflections
        envMapIntensity={1} // Controls the strength of environment reflections
      />
    </mesh>
  );
}

export default function Tutorial() {
  const N = 5; // Grid size
  const spacing = 3; // Space between spheres
  const offset = ((N - 1) * spacing) / 2; // Offset to center the grid

  return (
    <S.TutorialContainer>
      <Canvas camera={{ position: [50, 50, 50] }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffd9aa" />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[5, 5, 0]} intensity={1.5} angle={0.5} penumbra={0.5} color="#ffffff" />
        <Environment
          preset="city"
          // Other options: 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'
          //   background // Optional: renders env map as background
        />
        {Array.from({ length: N }, (_, i) =>
          Array.from({ length: N }, (_, j) => Array.from({ length: N }, (_, k) => <Sphere key={`${i}-${j}-${k}`} position={[i * spacing - offset, j * spacing - offset, k * spacing - offset]} />))
        )}
        <OrbitControls />
        <Stars />
        <Sky />
      </Canvas>
    </S.TutorialContainer>
  );
}
