import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";

import useMousePos from "utils/hooks/useMousePos";

const X = 51;
const Y = 51;

export default function Component() {
  return (
    <S.Container>
      <Canvas
        camera={{
          position: [0, 0, 25],
        }}
      >
        <ambientLight intensity={2} />
        {/* <directionalLight position={[0, 10, 0]} intensity={1} /> */}
        <directionalLight position={[0, 10, 10]} intensity={1} />

        <InnerEl />

        <mesh position={[0, -38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[800, 800]} />
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

        <Environment preset="warehouse" />
        <OrbitControls />
        <Stars />
      </Canvas>
    </S.Container>
  );
}

function InnerEl() {
  const mousePos = useMousePos();
  const cats = useRef([]);
  const fbx = useFBX("/assets/id430/cat/source/cat.fbx");

  const { size } = useThree();

  return (
    <>
      <Instances limit={3000} range={3000}>
        <boxGeometry />
        <meshStandardMaterial roughness={0} metalness={1} />

        {new Array(X).fill(0).map((_, i) => {
          return new Array(Y).fill(0).map((_, j) => <SingleBlock key={100 * i + j} i={i} j={j} mousePos={mousePos} position={[(i - (X - 1) / 2) * 1.5 + mousePos.x, (-j + (Y - 1) / 2) * 1.5, 0]} />);
        })}
      </Instances>
    </>
  );
}

function SingleBlock(props) {
  const xIndicator = useMemo(() => 0.05 / (Math.abs(props.mousePos.x - props.i / X) * 0.3 + 0.008), [props]);
  const yIndicator = useMemo(() => 0.05 / (Math.abs(props.mousePos.y - props.j / Y) * 0.3 + 0.008), [props]);

  return (
    <group {...props}>
      <Instance
        color={new THREE.Color(`hsl(${Math.max(160 + props.mousePos.x * 90 + props.mousePos.y * 130 - (xIndicator + yIndicator) * 25, 0)}, 100%, 50%)`)}
        scale={[1, 1, xIndicator * yIndicator * 1.3]}
        // rotation={[xIndicator * Math.PI * 0.05, 0, 0]}
      />
    </group>
  );
}
