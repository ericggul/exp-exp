import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";
import * as THREE from "three";
import { extend, Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import useSocket from "utils/hooks/socket/id430/mobile-letter/useSocketScreen";

//qr code
import { QRCodeSVG } from "qrcode.react";
const QR_URL = "https://exp-exp.onrender.com/id430/multiple-devices/mobile-letter/mobile";

const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function Component() {
  const socket = useSocket({
    handleNewText,
    handleNewOrientation,
  });

  const [orientationData, setOrientationData] = useState({ alpha: 0, beta: 0, gamma: 0 });
  function handleNewOrientation(data) {
    setOrientationData(data);
  }

  const [textArrays, setTextArrays] = useState([]);
  const [text, setText] = useState("");

  function handleNewText(data) {
    setTextArrays((arr) => {
      let copied = [...arr];
      //find if data.mobileId is redundant
      //find all
      const filteredData = data.mobileId ? copied.filter((item) => item.mobileId === data.mobileId) : copied;

      if (filteredData.length > 0) {
        filteredData.map((el, i) => {
          el.text = data.text;
          el.color = data.color;
        });
      } else {
        let currLen = copied.length / 2;

        copied.push({
          mobileId: data.mobileId,
          text: data.text,
          color: data.color,
          position: [-5, currLen, 0],
        });
        copied.push({
          mobileId: data.mobileId,
          text: data.text,
          color: data.color,
          position: [-5, -currLen, 0],
        });
        copied.push({
          mobileId: data.mobileId,
          text: data.text,
          color: data.color,
          position: [-5, 0, currLen],
        });
        copied.push({
          mobileId: data.mobileId,
          text: data.text,
          color: data.color,
          position: [-5, 0, -currLen],
        });
      }
      return copied;
    });

    setText(data.text);
  }

  return (
    <S.Container>
      <S.ThreeContainer>
        <Canvas>
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 10, 10]} intensity={1} color="red" />
          {textArrays.map((item, index) => (
            <InnerScene key={index} {...item} />
          ))}
          <Environment preset="dawn" />
          <CameraRotate orientationData={orientationData} />
          <OrbitControls />
        </Canvas>
      </S.ThreeContainer>

      <S.QRContainer>
        <QRCodeSVG value={QR_URL} size={150} bgColor="transparent" fgColor="white" />
      </S.QRContainer>
    </S.Container>
  );
}

function CameraRotate({ orientationData }) {
  const { camera } = useThree();

  useFrame(() => {
    if (orientationData) {
      const { alpha, beta, gamma } = orientationData;

      // Convert degrees to radians for Three.js
      let alphaRad = THREE.MathUtils.degToRad(alpha);
      let betaRad = THREE.MathUtils.degToRad(beta);
      let gammaRad = THREE.MathUtils.degToRad(-gamma);

      // Spherical coordinates
      const radius = 15; // distance from the center sphere
      const x = radius * Math.sin(betaRad) * Math.cos(alphaRad);
      const y = radius * Math.sin(betaRad) * Math.sin(alphaRad);
      const z = radius * Math.cos(betaRad);

      // Set camera position
      camera.position.set(x, y, z);

      // Ensure the camera looks at the center
      camera.lookAt(0, 0, 0);
    }
  });
  return <></>;
}

function InnerScene({ text, position, color }) {
  return (
    <group position={position}>
      <Text3D font="/assets/fonts/Roboto_Regular.json" size={1} height={0.2} curveSegments={32} bevelEnabled bevelThickness={0.1} bevelSize={0.05} bevelOffset={0} bevelSegments={8}>
        {text}
        <meshStandardMaterial attach="material" color={color} metalness={0.8} roughness={0.1} />
      </Text3D>
    </group>
  );
}
