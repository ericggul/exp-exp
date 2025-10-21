import React, { useRef } from "react";
import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Component() {
  return (
    <S.Container>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#111827"]} />
        <WavePattern />
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}

function WavePattern() {
  const mesh = useRef();
  const material = useRef();

  // Create grid geometry
  const geometry = new THREE.PlaneGeometry(15, 15, 150, 150);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Get vertices
    const position = geometry.attributes.position;

    // Update z-position of each vertex
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      // Create wave pattern with multiple sine waves
      const wave1 = Math.sin(x * 0.5 + time * 0.5) * 0.5;
      const wave2 = Math.sin(y * 0.5 + time * 0.5) * 0.5;
      const wave3 = Math.sin(x * 0.25 + y * 0.25 + time * 0.7) * 0.5;

      const z = wave1 + wave2 + wave3;

      position.setZ(i, z);
    }

    position.needsUpdate = true;

    // Update colors based on time
    if (material.current) {
      material.current.uniforms.uTime.value = time;
    }

    // Rotate mesh
    if (mesh.current) {
      mesh.current.rotation.z = time * 0.1;
    }
  });

  const shaderArgs = {
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#4338ca") },
      uColorB: { value: new THREE.Color("#ec4899") },
    },
    vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;
      
      void main() {
        float noise = sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime);
        vec3 color = mix(uColorA, uColorB, noise * 0.5 + 0.5);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };

  return (
    <mesh ref={mesh} rotation={[Math.PI / 3, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial ref={material} args={[shaderArgs]} side={THREE.DoubleSide} wireframe={true} />
    </mesh>
  );
}
