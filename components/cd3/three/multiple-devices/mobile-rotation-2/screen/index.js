import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { extend, Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import useSocket from "utils/hooks/socket/cd3/mobile-rotation-2/useSocketScreen";

import { Model } from "./model";

//qr code
import { QRCodeSVG } from "qrcode.react";
const QR_URL = "https://exp-exp.onrender.com/cd3/three/multiple-devices/mobile-rotation-2/mobile";

const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function Component() {
  const socket = useSocket({
    handleNewOrientation,
  });

  const [orientationData, setOrientationData] = useState({ alpha: 0, beta: 0, gamma: 0 });

  function handleNewOrientation(data) {
    setOrientationData(data);
  }

  return (
    <S.Container>
      <S.ThreeContainer>
        <Canvas
          camera={{
            position: [0, 0, 10],
          }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 10, 10]} intensity={1} color="red" />

          <InnerScene orientationData={orientationData} />
          <Environment
            preset="dawn"
            //show env
            background={true}
          />

          <OrbitControls />
        </Canvas>
      </S.ThreeContainer>

      <S.QRContainer>
        <QRCodeSVG value={QR_URL} size={150} bgColor="transparent" fgColor="white" />
      </S.QRContainer>
    </S.Container>
  );
}

function InnerScene({ orientationData }) {
  const { camera } = useThree();

  useFrame(() => {
    if (orientationData) {
      const { alpha, beta, gamma } = orientationData;

      // Convert degrees to radians for Three.js
      let alphaRad = THREE.MathUtils.degToRad(alpha);
      let betaRad = THREE.MathUtils.degToRad(beta);
      let gammaRad = THREE.MathUtils.degToRad(-gamma);

      // Spherical coordinates
      const radius = 25; // distance from the center sphere
      const x = radius * Math.sin(betaRad) * Math.cos(alphaRad);
      const y = radius * Math.sin(betaRad) * Math.sin(alphaRad);
      const z = radius * Math.cos(betaRad);

      // Set camera position
      camera.position.set(x, y, z);

      // Ensure the camera looks at the center
      camera.lookAt(0, 0, 0);
    }
  });
  return (
    <>
      <Model position={[0, -8, 0]} />
    </>
  );
}
