import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { extend, Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";

import { UnrealBloomPass } from "three-stdlib";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import useSocket from "utils/hooks/socket/id430/mobile-rotation-1/useSocketScreen";

//qr code
import { QRCodeSVG } from "qrcode.react";
const QR_URL = "https://exp-exp.onrender.com/id412/multiple-devices/mobile-rotation-1/mobile";

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
            position: [0, 0, 0],
          }}
        >
          <ambientLight intensity={1} />
          {/* <directionalLight position={[0, 10, 0]} intensity={1} /> */}
          <directionalLight position={[0, 10, 10]} intensity={1} />

          <InnerScene orientationData={orientationData} />
          <Environment preset="dawn" />

          <OrbitControls />
          <Stars />
          <PostProcessingEl />
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

  const color = useMemo(() => new THREE.Color(`hsl(${getRandom(0, 360)}, 100%, 50%)`), []);
  const hue = useMemo(() => getRandom(0, 360), []);

  useFrame(() => {
    if (orientationData) {
      const { alpha, beta, gamma } = orientationData;

      // Convert degrees to radians for Three.js
      const alphaRad = THREE.MathUtils.degToRad(alpha);
      const betaRad = THREE.MathUtils.degToRad(beta);
      const gammaRad = THREE.MathUtils.degToRad(-gamma);

      camera.rotation.set(betaRad, alphaRad, gammaRad);
    }
  });

  const starsData = useMemo(
    () =>
      new Array(100).fill(0).map((_, i) => ({
        position: [getRandom(10, 200) * (Math.random() < 0.5 ? -1 : 1), getRandom(10, 250) * (Math.random() < 0.5 ? -1 : 1), getRandom(10, 250) * (Math.random() < 0.5 ? -1 : 1)],
        colorHue: getRandom(0, 360),
        colorLightness: getRandom(20, 100),
        roughness: getRandom(0, 0.3),
        size: getRandom(1, 4),
      })),
    []
  );

  return (
    <>
      {starsData.map((star, i) => (
        <mesh key={i} position={star.position}>
          <sphereGeometry args={[star.size, 32, 32]} />
          <meshStandardMaterial
            color={new THREE.Color(`hsl(${star.colorHue}, 100%, ${star.colorLightness}%)`)}
            //doubleside
            side={THREE.DoubleSide}
            roughness={star.roughness}
            metalness={1 - star.roughness}
          />
        </mesh>
      ))}

      <mesh position={[0, -10, 0]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(`hsl(${hue}, 100%, 50%)`)}
          //doubleside
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </>
  );
}

function PostProcessingEl() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0.1} height={400} />
    </EffectComposer>
  );
}
