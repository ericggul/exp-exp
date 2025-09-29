import * as S from "./styles";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, animated as a, config as springConfig } from "@react-spring/three";
import { useState, useCallback, useRef } from "react";
import * as THREE from "three";

// Object 1: Cube that scales and changes color on hover, and continuously rotates
function AnimatedCube() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false); // For continuous rotation toggle

  // Spring for hover effect (scale)
  const hoverSpring = useSpring({
    scale: hovered ? 1.5 : 1,
    // color: hovered ? "hotpink" : "mediumpurple", // Temporarily remove color from spring animation
    config: springConfig.gentle, 
  });

  // Spring for continuous rotation (driven by 'clicked' state)
  const rotationSpring = useSpring({
    rotation: clicked ? [0, 2 * Math.PI, 0] : [0, 0, 0], // Rotate 360 degrees on Y axis
    config: { tension: 40, friction: 50, loop: clicked }, // Loop if clicked
    reset: !clicked, // Reset when unclicked
  });

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={hoverSpring.scale}
      rotation={rotationSpring.rotation} // Apply rotation
      position={[-2.5, 0, 0]} // Position it to the left
    >
      <boxGeometry args={[2, 2, 2]} />
      <a.meshStandardMaterial 
        // Apply color directly based on state, not from spring
        color={hovered ? "hotpink" : "mediumpurple"} 
      />
    </a.mesh>
  );
}

// Object 2: Sphere that changes position on click and opacity on hover
function AnimatedSphere() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const sphereSpring = useSpring({
    // Animate position: move up when active, back to 0 otherwise
    position: active ? [0, 1.5, 0] : [0, 0, 0],
    // Animate opacity: more opaque when hovered
    opacity: hovered ? 1 : 0.7,
    config: springConfig.wobbly, // A wobbly spring configuration
  });

  return (
    <a.mesh
      position={sphereSpring.position} // Initial position will be overridden by spring
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={1} // Static scale for this example
    >
      <sphereGeometry args={[1, 32, 32]} />
      <a.meshStandardMaterial
        color="skyblue"
        opacity={sphereSpring.opacity}
        transparent // Important for opacity to work
      />
    </a.mesh>
  );
}

// Object 3: Torus that subtly reacts to mouse movement (more advanced)
function InteractiveTorus() {
  const [props, set] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 2, tension: 200, friction: 50 },
  }));

  // This would ideally use global mouse coords mapped to rotation
  // For simplicity, let's make it react to hover with a predefined animation
  const [hovered, setHovered] = useState(false);

  useSpring({
    rotation: hovered ? [Math.PI / 4, Math.PI / 4, 0] : [0, 0, 0],
    config: springConfig.stiff,
    onChange: ({ value }) => set({ rotation: value.rotation }), // Update the spring via set
    reset: !hovered,
  });


  return (
    <a.mesh
      {...props} // Apply rotation from spring
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[2.5, 0, 0]} // Position it to the right
      scale={0.8}
    >
      <torusGeometry args={[0.8, 0.3, 16, 100]} />
      <a.meshStandardMaterial color="lightgreen" />
    </a.mesh>
  );
}


export default function ReactThreeTutorial() {
  return (
    <S.Container>
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        {/* Enhanced lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />

        {/* Instructions or Title (Optional, can be done with Drei's Text) */}
        {/* <Text position={[0, 3, 0]} fontSize={0.5} color="white">
          React Spring Animations
        </Text> */}

        <AnimatedCube />
        <AnimatedSphere />
        <InteractiveTorus />

        <OrbitControls />
      </Canvas>
    </S.Container>
  );
} 