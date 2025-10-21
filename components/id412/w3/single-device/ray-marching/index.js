import React, { useRef, useState } from "react";
import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Component() {
  const [shape, setShape] = useState("sphere");

  return (
    <S.Container>
      <S.Controls>
        <S.ControlGroup>
          <S.Button active={shape === "sphere"} onClick={() => setShape("sphere")}>
            Sphere
          </S.Button>
          <S.Button active={shape === "torus"} onClick={() => setShape("torus")}>
            Torus
          </S.Button>
          <S.Button active={shape === "box"} onClick={() => setShape("box")}>
            Box
          </S.Button>
          <S.Button active={shape === "mandelbulb"} onClick={() => setShape("mandelbulb")}>
            Mandelbulb
          </S.Button>
        </S.ControlGroup>
      </S.Controls>

      <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}>
        <RayMarchingScene shape={shape} />
      </Canvas>
    </S.Container>
  );
}

function RayMarchingScene({ shape }) {
  const mesh = useRef();
  const material = useRef();

  // Create a simple plane that will be our canvas for the shader
  const geometry = new THREE.PlaneGeometry(4, 2, 1, 1);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
      material.current.uniforms.uMouse.value.set(state.mouse.x * 0.5 + 0.5, state.mouse.y * 0.5 + 0.5);

      // Update shape uniform based on current shape selection
      if (shape === "sphere") material.current.uniforms.uShapeType.value = 0;
      else if (shape === "box") material.current.uniforms.uShapeType.value = 1;
      else if (shape === "torus") material.current.uniforms.uShapeType.value = 2;
      else if (shape === "mandelbulb") material.current.uniforms.uShapeType.value = 3;
    }
  });

  const shaderArgs = {
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uShapeType: { value: shape === "sphere" ? 0 : shape === "box" ? 1 : shape === "torus" ? 2 : 3 },
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
      uniform int uShapeType;
      
      varying vec2 vUv;
      
      #define MAX_STEPS 100
      #define MAX_DIST 100.0
      #define SURF_DIST 0.001
      #define PI 3.14159265359
      
      // SDF for sphere
      float sdSphere(vec3 p, float r) {
        return length(p) - r;
      }
      
      // SDF for box
      float sdBox(vec3 p, vec3 b) {
        vec3 d = abs(p) - b;
        return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
      }
      
      // SDF for torus
      float sdTorus(vec3 p, vec2 t) {
        vec2 q = vec2(length(p.xz) - t.x, p.y);
        return length(q) - t.y;
      }
      
      // SDF for mandelbulb (simplified)
      float sdMandelbulb(vec3 p) {
        p = p * 0.7;
        vec3 z = p;
        float dr = 1.0;
        float r = 0.0;
        float power = 8.0;
        
        for (int i = 0; i < 5; i++) {
          r = length(z);
          if (r > 2.0) break;
          
          // Convert to polar coords
          float theta = acos(z.z / r);
          float phi = atan(z.y, z.x);
          dr = pow(r, power - 1.0) * power * dr + 1.0;
          
          // Scale and rotate
          float zr = pow(r, power);
          theta = theta * power;
          phi = phi * power;
          
          // Convert back to cartesian
          z = zr * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta));
          z += p;
        }
        return 0.5 * log(r) * r / dr;
      }
      
      // Get scene SDF using integer instead of string
      float map(vec3 p) {
        vec3 p1 = p;
        p1.xz = mat2(cos(uTime * 0.3), sin(uTime * 0.3), -sin(uTime * 0.3), cos(uTime * 0.3)) * p1.xz;
        
        if (uShapeType == 0) {
          return sdSphere(p1, 1.0);
        } else if (uShapeType == 1) {
          return sdBox(p1, vec3(0.8));
        } else if (uShapeType == 2) {
          return sdTorus(p1, vec2(1.0, 0.3));
        } else if (uShapeType == 3) {
          return sdMandelbulb(p1);
        }
        
        return sdSphere(p1, 1.0); // Default
      }
      
      // Get normal
      vec3 getNormal(vec3 p) {
        vec2 e = vec2(0.001, 0.0);
        return normalize(vec3(
          map(p + e.xyy) - map(p - e.xyy),
          map(p + e.yxy) - map(p - e.yxy),
          map(p + e.yyx) - map(p - e.yyx)
        ));
      }
      
      // Ray marching
      float rayMarch(vec3 ro, vec3 rd) {
        float dO = 0.0;
        float dS;
        
        for (int i = 0; i < MAX_STEPS; i++) {
          vec3 p = ro + rd * dO;
          dS = map(p);
          dO += dS;
          if (dO > MAX_DIST || dS < SURF_DIST) break;
        }
        
        return dO;
      }
      
      // Main rendering function
      void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= uResolution.x / uResolution.y;
        
        // Camera setup
        vec3 ro = vec3(0.0, 0.0, 3.0); // Ray origin
        vec3 rd = normalize(vec3(uv, -1.0)); // Ray direction
        
        // Ray rotation based on mouse
        float mouseX = (uMouse.x - 0.5) * 2.0;
        float mouseY = (uMouse.y - 0.5) * 2.0;
        rd.yz = mat2(cos(mouseY), sin(mouseY), -sin(mouseY), cos(mouseY)) * rd.yz;
        rd.xz = mat2(cos(mouseX), sin(mouseX), -sin(mouseX), cos(mouseX)) * rd.xz;
        
        // Perform ray marching
        float d = rayMarch(ro, rd);
        
        // Coloring
        vec3 col = vec3(0.0);
        
        if (d < MAX_DIST) {
          vec3 p = ro + rd * d;
          vec3 n = getNormal(p);
          
          // Lighting
          vec3 lightPos = vec3(3.0 * sin(uTime), 3.0, 3.0 * cos(uTime));
          vec3 lightDir = normalize(lightPos - p);
          
          // Shadow calculation
          float dif = max(dot(n, lightDir), 0.0);
          float shadow = 1.0;
          
          if (dif > 0.001) {
            float dS = rayMarch(p + n * SURF_DIST * 2.0, lightDir);
            if (dS < length(lightPos - p)) shadow = 0.3;
          }
          
          // Ambient light
          float ambient = 0.2;
          
          // Color based on normal and height
          vec3 baseColor = 0.5 + 0.5 * cos(uTime * 0.2 + p.y + vec3(0, 2, 4));
          
          // Final color
          col = baseColor * (ambient + dif * shadow);
          
          // Fresnel effect
          float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
          col = mix(col, vec3(1.0), fresnel * 0.3);
        }
        
        // Gamma correction
        col = pow(col, vec3(0.4545));
        
        gl_FragColor = vec4(col, 1.0);
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
