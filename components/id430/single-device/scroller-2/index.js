import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { ScrollControls, OrbitControls, useScroll, Stars, Text3D, Center, MeshReflectorMaterial } from "@react-three/drei";

export default function Component() {
  return (
    <S.Container>
      <Canvas shadows>
        <ambientLight intensity={0.1} />
        <ScrollControls
          pages={40}
          //stylye scrollbar hide
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <InnerEl />
        </ScrollControls>

        <Stars radius={4} depth={5} count={5000} factor={4} saturation={0} fade speed={1} />
        {/* <OrbitControls /> */}
      </Canvas>
    </S.Container>
  );
}

function InnerEl() {
  const scroll = useScroll();

  const [scrollPos, setScrollPos] = useState(0);

  useFrame(() => {
    const pos = scroll.range(0, 1);
    setScrollPos(pos);
  });

  return (
    <>
      <directionalLight position={[0, 10 * Math.cos(scrollPos * Math.PI * 3), 10 * Math.sin(scrollPos * Math.PI * 3)]} intensity={1} />

      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 32]} />
        <meshStandardMaterial color={new THREE.Color(`hsl(${scrollPos * 360}, 100%, 50%)`)} metalness={0.8} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3 + scrollPos * 3, 64, 32]} />
        <MeshReflectorMaterial mixBlur={0} mixStrength={1} mixContrast={1} resolution={512} mirror={1} depthToBlurRatioBias={0.9} debug={0} side={THREE.BackSide} />
      </mesh>
    </>
  );
}
