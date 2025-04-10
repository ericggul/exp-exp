import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, MeshReflectorMaterial, useScroll, Text3D, Center, Stars } from "@react-three/drei";

import useMousePos from "utils/hooks/useMousePos";

export default function Component() {
  return (
    <S.Container>
      <Canvas>
        <ambientLight intensity={2} />
        {/* <directionalLight position={[0, 10, 0]} intensity={1} /> */}
        <directionalLight position={[0, 0, 10]} intensity={1} />

        <InnerEl />

        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[30, 30]} />
          <MeshReflectorMaterial
            mixBlur={0}
            mixStrength={1}
            mixContrast={1}
            resolution={2048}
            mirror={1}
            depthToBlurRatioBias={0.9}
            debug={0}
            //both side
            side={THREE.DoubleSide}
          />
        </mesh>

        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}

function InnerEl() {
  const mousePos = useMousePos();
  const cats = useRef([]);
  const fbx = useFBX("/assets/id430/cat/source/cat.fbx");

  const { size } = useThree();

  useEffect(() => {
    if (cats.current.length === 0) {
      cats.current = Array.from({ length: 8 }, () => {
        const cat = fbx.clone();
        cat.position.set(0, 0, 0);
        return cat;
      });
    }
  }, [fbx]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (cats.current[0]) {
      // Move the first cat according to the mouse position
      cats.current[0].position.x = (mousePos.x - 0.5) * size.width * 0.01;
      cats.current[0].position.y = (-mousePos.y + 0.5) * size.height * 0.01;
      cats.current[0].rotation.y = t * 0.5;
    }

    // Make each subsequent cat follow the one in front of it
    for (let i = 1; i < cats.current.length; i++) {
      if (cats.current[i] && cats.current[i - 1]) {
        const previousCat = cats.current[i - 1];
        const currentCat = cats.current[i];

        const dx = previousCat.position.x - currentCat.position.x;
        const dy = previousCat.position.y - currentCat.position.y;

        currentCat.position.x += dx * 0.15; // Adjust the factor to change the following speed
        currentCat.position.y += dy * 0.15;

        currentCat.rotation.y = t * (i * 0.17 + 0.5);
      }
    }
  });

  return (
    <>
      {cats.current.map((cat, index) => (
        <primitive scale={[1.2, 1.2, 1.2]} key={index} object={cat} />
      ))}
    </>
  );
}
