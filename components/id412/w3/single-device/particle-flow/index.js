import React, { useRef, useMemo } from "react";
import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Component() {
  return (
    <S.Container>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 15, 30]} />
        <ParticleFlow />
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}

function ParticleFlow() {
  const points = useRef();
  const particleCount = 5000;

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Scale
      scales[i] = Math.random() * 0.5 + 0.5;

      // Color
      const mixColor = i / particleCount;
      color.setHSL(mixColor, 0.7, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, scales, colors };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Create flowing motion
      const angle = time * 0.2 + i * 0.01;
      positions[i3] = x + Math.sin(angle) * delta * 0.5;
      positions[i3 + 1] = y + Math.cos(angle) * delta * 0.5;
      positions[i3 + 2] = z + Math.sin(angle * 0.5) * delta * 0.5;

      // Reset position if the particle gets too far
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > 10) {
        positions[i3] = (Math.random() - 0.5) * 8;
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
        positions[i3 + 2] = (Math.random() - 0.5) * 8;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the entire point cloud
    points.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={particlePositions.colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={particlePositions.scales} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent alphaTest={0.01} blending={THREE.AdditiveBlending} />
    </points>
  );
}
