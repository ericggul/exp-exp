import React, { useRef, useState } from "react";
import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Component() {
  const [depth, setDepth] = useState(9);
  const [branchFactor, setBranchFactor] = useState(0.67);
  const [rotation, setRotation] = useState(0.4);

  return (
    <S.Container>
      <S.Controls>
        <S.ControlGroup>
          <S.Label>Depth: {depth}</S.Label>
          <S.Slider type="range" min="1" max="12" value={depth} onChange={(e) => setDepth(parseInt(e.target.value))} />
        </S.ControlGroup>

        <S.ControlGroup>
          <S.Label>Branch Factor: {branchFactor.toFixed(2)}</S.Label>
          <S.Slider type="range" min="0.3" max="0.9" step="0.01" value={branchFactor} onChange={(e) => setBranchFactor(parseFloat(e.target.value))} />
        </S.ControlGroup>

        <S.ControlGroup>
          <S.Label>Rotation: {rotation.toFixed(2)}</S.Label>
          <S.Slider type="range" min="0.1" max="1.2" step="0.01" value={rotation} onChange={(e) => setRotation(parseFloat(e.target.value))} />
        </S.ControlGroup>
      </S.Controls>

      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <color attach="background" args={["#0c0c0c"]} />
        <FractalTree depth={depth} branchFactor={branchFactor} rotation={rotation} />
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}

function FractalTree({ depth, branchFactor, rotation }) {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  // Generate the fractal tree recursively
  const createBranch = (level, maxLevel, length, thickness, x, y, z, rotX, rotY, rotZ) => {
    // Base case
    if (level >= maxLevel) return null;

    // Create branch cylinder
    const branch = (
      <mesh key={`${level}-${x}-${y}-${z}`} position={[x, y, z]} rotation={[rotX, rotY, rotZ]}>
        <cylinderGeometry args={[thickness * 0.5, thickness, length, 8]} />
        <meshStandardMaterial color={new THREE.Color().setHSL(0.25 + level * 0.03, 0.9, 0.4 - level * 0.03)} roughness={0.7} metalness={0.2} />
      </mesh>
    );

    // Calculate next branch positions
    const endX = 0;
    const endY = length;
    const endZ = 0;

    // Create branches
    const branches = [];
    branches.push(branch);

    // Add child branches if not at max depth
    if (level < maxLevel) {
      // Next branch parameters
      const newLength = length * branchFactor;
      const newThickness = thickness * 0.7;

      // Left branch
      branches.push(createBranch(level + 1, maxLevel, newLength, newThickness, endX, endY, endZ, rotX + rotation, rotY + rotation, rotZ));

      // Right branch
      branches.push(createBranch(level + 1, maxLevel, newLength, newThickness, endX, endY, endZ, rotX - rotation, rotY - rotation, rotZ));

      // Middle branch (sometimes)
      if (Math.random() > 0.5 && level < maxLevel - 2) {
        branches.push(createBranch(level + 1, maxLevel, newLength * 0.9, newThickness, endX, endY, endZ, rotX + rotation * 0.5, rotY, rotZ + rotation * 0.5));
      }
    }

    return (
      <group position={[0, 0, 0]} key={`group-${level}-${x}-${y}-${z}`}>
        {branches}
      </group>
    );
  };

  const initialBranch = createBranch(0, depth, 2, 0.2, 0, -5, 0, 0, 0, 0);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group ref={group}>{initialBranch}</group>
    </>
  );
}
