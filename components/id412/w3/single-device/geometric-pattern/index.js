import React, { useRef, useMemo, useState } from "react";
import * as S from "./styles";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Component() {
  const [pattern, setPattern] = useState("circles");

  return (
    <S.Container>
      <S.Controls>
        <S.Button active={pattern === "circles"} onClick={() => setPattern("circles")}>
          Circles
        </S.Button>
        <S.Button active={pattern === "triangles"} onClick={() => setPattern("triangles")}>
          Triangles
        </S.Button>
        <S.Button active={pattern === "hexagons"} onClick={() => setPattern("hexagons")}>
          Hexagons
        </S.Button>
      </S.Controls>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#f8f9fa"]} />
        <GeometricPattern pattern={pattern} />
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </S.Container>
  );
}

function GeometricPattern({ pattern }) {
  const { size } = useThree();
  const group = useRef();

  // Calculate grid dimensions based on screen size
  const gridSize = Math.min(size.width, size.height) * 0.08;
  const cols = Math.floor(size.width / gridSize);
  const rows = Math.floor(size.height / gridSize);

  // Generate shapes based on the pattern type
  const shapes = useMemo(() => {
    const items = [];
    const marginX = (size.width - cols * gridSize) / 2;
    const marginY = (size.height - rows * gridSize) / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize - size.width / 2 + gridSize / 2 + marginX;
        const y = j * gridSize - size.height / 2 + gridSize / 2 + marginY;

        // Calculate distance from center for color and scale
        const centerX = 0;
        const centerY = 0;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(size.width / 2, 2) + Math.pow(size.height / 2, 2));
        const normalizedDistance = distance / maxDistance;

        // Add each shape with its properties
        items.push({
          position: [x, y, 0],
          rotation: [i * 0.1, j * 0.1, 0],
          scale: 1 - normalizedDistance * 0.5,
          color: new THREE.Color().setHSL(normalizedDistance, 0.7, 0.5),
        });
      }
    }

    return items;
  }, [size, cols, rows, gridSize]);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();

      // Animate each shape in the group
      group.current.children.forEach((child, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;

        // Create wave-like motion
        child.position.z = Math.sin(time * 2 + col * 0.5 + row * 0.5) * 0.5;

        // Rotate shape
        child.rotation.z = time * 0.2 + col * 0.1 + row * 0.1;
      });
    }
  });

  // Render different geometries based on pattern type
  const renderShape = (item, index) => {
    const baseProps = {
      key: index,
      position: item.position,
      rotation: item.rotation,
      scale: item.scale,
    };

    switch (pattern) {
      case "triangles":
        return (
          <mesh {...baseProps}>
            <cylinderGeometry args={[0, gridSize * 0.4, gridSize * 0.2, 3]} />
            <meshStandardMaterial color={item.color} />
          </mesh>
        );

      case "hexagons":
        return (
          <mesh {...baseProps}>
            <cylinderGeometry args={[gridSize * 0.4, gridSize * 0.4, gridSize * 0.1, 6]} />
            <meshStandardMaterial color={item.color} />
          </mesh>
        );

      case "circles":
      default:
        return (
          <mesh {...baseProps}>
            <sphereGeometry args={[gridSize * 0.3, 32, 32]} />
            <meshStandardMaterial color={item.color} />
          </mesh>
        );
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      <group ref={group}>{shapes.map((item, index) => renderShape(item, index))}</group>
    </>
  );
}
