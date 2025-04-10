import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";

import Tracker from "./tracker";

import useSocket from "utils/hooks/socket/cd3/mobile-rotation-1/useSocketMobile";

export default function Component() {
  const [requestPermission, setRequestPermission] = useState(false);

  const socket = useSocket();

  const [orientationData, setOrientationData] = useState({ alpha: 0, beta: 0, gamma: 0 });

  return (
    <S.Container>
      <Canvas
        camera={{
          position: [0, 0, 0],
        }}
      >
        <ambientLight intensity={2} />
        {/* <directionalLight position={[0, 10, 0]} intensity={1} /> */}
        <directionalLight position={[0, 10, 10]} intensity={1} />

        <InnerScene orientationData={orientationData} />
        {/* <OrbitControls /> */}
      </Canvas>

      <Tracker requestPermission={requestPermission} setRequestPermission={setRequestPermission} socket={socket} setOrientationData={setOrientationData} />
    </S.Container>
  );
}
function InnerScene({ orientationData }) {
  const { camera } = useThree();

  useFrame(() => {
    if (orientationData) {
      const { alpha, beta, gamma } = orientationData;

      // Convert degrees to radians for Three.js
      const alphaRad = THREE.MathUtils.degToRad(alpha);
      const betaRad = THREE.MathUtils.degToRad(beta);
      const gammaRad = THREE.MathUtils.degToRad(-gamma);

      // Set camera rotation
      camera.rotation.set(betaRad, alphaRad, gammaRad);

      // Ensure the camera looks at the center
      // camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <mesh position={[0, -10, 0]}>
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(`hsl(100, 100%, 50%)`)}
          //doubleside
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <Environment preset="warehouse" />
      <Stars />
    </>
  );
}
