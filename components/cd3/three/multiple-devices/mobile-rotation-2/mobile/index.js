import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";

import Tracker from "./tracker";

import useSocket from "utils/hooks/socket/cd3/mobile-rotation-2/useSocketMobile";

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

  // useFrame(() => {
  //   if (orientationData) {
  //     const { alpha, beta, gamma } = orientationData;

  //     // Convert degrees to radians for Three.js
  //     const alphaRad = THREE.MathUtils.degToRad(alpha);
  //     const betaRad = THREE.MathUtils.degToRad(beta);
  //     const gammaRad = THREE.MathUtils.degToRad(gamma);

  //     // Spherical coordinates
  //     const radius = 25; // distance from the center sphere
  //     const x = radius * Math.sin(betaRad) * Math.cos(alphaRad);
  //     const y = radius * Math.sin(betaRad) * Math.sin(alphaRad);
  //     const z = radius * Math.cos(betaRad);

  //     // Set camera position
  //     camera.position.set(x, y, z);

  //     // Ensure the camera looks at the center
  //     camera.lookAt(0, 0, 0);
  //   }
  // });

  useFrame(() => {
    if (orientationData) {
      const { alpha, beta, gamma } = orientationData;

      // Convert degrees to radians for Three.js
      let alphaRad = THREE.MathUtils.degToRad(alpha);
      let betaRad = THREE.MathUtils.degToRad(beta);
      let gammaRad = THREE.MathUtils.degToRad(-gamma);

      camera.rotation.set(betaRad, alphaRad, gammaRad);

      // Ensure the camera looks at the center
      // camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <Environment preset="warehouse" background={true} />
    </>
  );
}
