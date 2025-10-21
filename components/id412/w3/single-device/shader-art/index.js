import React, { useRef } from "react";
import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Component() {
  return (
    <S.Container>
      <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}>
        <ShaderArt />
      </Canvas>
    </S.Container>
  );
}

function ShaderArt() {
  const mesh = useRef();
  const material = useRef();

  // Create a simple plane that will be our canvas for the shader
  const geometry = new THREE.PlaneGeometry(4, 2, 1, 1);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
      material.current.uniforms.uMouse.value.set(state.mouse.x * 0.5 + 0.5, state.mouse.y * 0.5 + 0.5);
    }
  });

  const shaderArgs = {
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
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
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;
      
      #define PI 3.14159265359
      
      // Function to create a color gradient
      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        
        return a + b * cos(6.28318 * (c * t + d));
      }
      
      // Distance function for creating shapes
      float sdCircle(vec2 p, float r) {
        return length(p) - r;
      }
      
      void main() {
        // Normalized coordinates (centered, and y goes from bottom to top)
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= uResolution.x / uResolution.y;
        
        // Time varying pixel color
        vec3 finalColor = vec3(0.0);
        
        // Number of layers
        const int LAYERS = 5;
        
        for (int i = 0; i < LAYERS; i++) {
          // Create time offset for each layer
          float timeOffset = float(i) * 0.2;
          
          // Create moving center for each shape
          vec2 center = vec2(
            cos(uTime * 0.5 + timeOffset) * 0.5,
            sin(uTime * 0.3 + timeOffset) * 0.3
          );
          
          // Create distance field
          float d = sdCircle(uv - center, 0.2 + sin(uTime + timeOffset) * 0.1);
          
          // Add influence from mouse position
          d -= 0.1 * (1.0 - distance(uv, uMouse * 2.0 - 1.0));
          
          // Create color based on distance and time
          vec3 color = palette(d * 0.1 + uTime * 0.1 + timeOffset);
          
          // Add glow effect
          float glow = 0.005 / abs(d);
          color *= glow * 0.5;
          
          // Add the layer color to the final result
          finalColor += color;
        }
        
        // Output to screen
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  };

  return (
    <mesh ref={mesh}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial ref={material} args={[shaderArgs]} side={THREE.DoubleSide} />
    </mesh>
  );
}
