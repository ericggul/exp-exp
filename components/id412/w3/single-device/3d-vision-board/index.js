import React, { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Sample goals for the vision board (without external images)
const SAMPLE_IMAGES = [
  { id: 1, name: "Career Growth", description: "Expand skills in leadership", icon: "🚀" },
  { id: 2, name: "Travel", description: "Visit 3 new countries", icon: "✈️" },
  { id: 3, name: "Fitness", description: "Train for a marathon", icon: "🏃" },
  { id: 4, name: "Learning", description: "Learn a new language", icon: "📚" },
  { id: 5, name: "Family", description: "Quality time with loved ones", icon: "👪" },
  { id: 6, name: "Creativity", description: "Start a creative project", icon: "🎨" },
  { id: 7, name: "Mindfulness", description: "Practice daily meditation", icon: "🧘" },
  { id: 8, name: "Nature", description: "Connect with the outdoors", icon: "🌲" },
];

// Colors for the panels
const COLORS = ["#FF5E5B", "#D8D8F6", "#E9D985", "#8F9E9A", "#75A9D8", "#FFAE42", "#2CEAA3", "#9C95DC"];

export default function Component() {
  return (
    <S.Container>
      <S.Title>3D Vision Board</S.Title>
      <S.Subtitle>Visualize your goals in an immersive 3D space</S.Subtitle>
      <Canvas shadows>
        <color attach="background" args={["#111827"]} />
        <fog attach="fog" args={["#111827", 15, 30]} />
        <VisionBoardScene />
        <OrbitControls enablePan={true} enableZoom={true} maxDistance={20} minDistance={5} />
      </Canvas>
    </S.Container>
  );
}

const VisionBoardScene = () => {
  const { camera } = useThree();
  const [activeItem, setActiveItem] = useState(null);
  const groupRef = useRef();

  // Position camera
  useEffect(() => {
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Setup circular arrangement of vision board items
  const generatePositions = () => {
    const positions = [];
    const itemCount = SAMPLE_IMAGES.length;
    const radius = 8;

    for (let i = 0; i < itemCount; i++) {
      const angle = (i / itemCount) * Math.PI * 2;

      // Calculate position on circle
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      const z = Math.sin(angle + Math.PI / 4) * 2; // Add some depth variation

      // Calculate rotation to face center
      const rotationY = Math.atan2(x, y);

      positions.push({
        position: [x, y, z],
        rotation: [0, rotationY, 0],
      });
    }

    return positions;
  };

  const positions = generatePositions();

  // Handle floating animation with time
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation of the entire vision board
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;

      // Make each panel float up and down slightly
      groupRef.current.children.forEach((child, index) => {
        if (child.userData.isPanel) {
          const offset = index * 0.5;
          child.position.y += Math.sin(state.clock.getElapsedTime() + offset) * 0.002;
        }
      });
    }
  });

  // Reset active item when clicking elsewhere
  const handleBackgroundClick = (e) => {
    e.stopPropagation();
    setActiveItem(null);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />

      {/* Background plane for clicking to deselect */}
      <mesh position={[0, 0, -10]} onClick={handleBackgroundClick}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Vision board items group */}
      <group ref={groupRef}>
        {SAMPLE_IMAGES.map((item, index) => (
          <VisionBoardItem
            key={item.id}
            item={item}
            position={positions[index].position}
            rotation={positions[index].rotation}
            color={COLORS[index % COLORS.length]}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id === activeItem ? null : item.id)}
          />
        ))}
      </group>

      {/* Center eye/focus point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#6366F1" emissive="#6366F1" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
};

const VisionBoardItem = ({ item, position, rotation, color, isActive, onClick }) => {
  const ref = useRef();

  // Scale and position when active
  useFrame(() => {
    if (ref.current) {
      ref.current.userData.isPanel = true;

      // Animate scale based on active state
      ref.current.scale.lerp(new THREE.Vector3(isActive ? 1.5 : 1, isActive ? 1.5 : 1, isActive ? 1.5 : 1), 0.1);

      // Move forward when active
      if (isActive) {
        const targetZ = position[2] + 2;
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.1);
      } else {
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, position[2], 0.1);
      }
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Vision panel */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Text label on the panel */}
      <Text position={[0, 0.3, 0.06]} color="white" fontSize={0.25} maxWidth={2.5} textAlign="center">
        {item.name}
      </Text>

      {/* Icon on the panel */}
      <Text position={[0, -0.2, 0.06]} color="white" fontSize={0.6} maxWidth={2.5} textAlign="center">
        {item.icon}
      </Text>

      {/* Description - only visible when active */}
      {isActive && (
        <Html position={[0, -1.5, 0.5]} transform distanceFactor={8}>
          <S.ItemDescription>
            <S.ItemTitle>{item.name}</S.ItemTitle>
            <S.ItemText>{item.description}</S.ItemText>
          </S.ItemDescription>
        </Html>
      )}
    </group>
  );
};
