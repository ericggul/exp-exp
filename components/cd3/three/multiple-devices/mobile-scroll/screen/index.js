import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import * as S from "./styles";
import * as THREE from "three";
import { extend, Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, Environment, MeshReflectorMaterial, useScroll, Text3D, Center, Stars, Instances, Instance, useTexture, Water } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import useSocket from "utils/hooks/socket/cd3/mobile-scroll/useSocketScreen";

const INTERVAL = Math.sqrt(2);

//qr code
import { QRCodeSVG } from "qrcode.react";
const QR_URL = "https://exp-exp.onrender.com/cd3/multiple-devices/mobile-scroll/mobile";

export default function Component() {
  const socket = useSocket({
    handleNewScroll,
  });

  const [scrollPoses, setScrollPoses] = useState([]);

  function handleNewScroll(data) {
    setScrollPoses((arr) => {
      let copied = [...arr];

      const filtered = copied.filter((item) => item.mobileId == data.mobileId);

      if (filtered.length > 0) {
        filtered.forEach((el) => {
          el.scrollPos = data.scrollPos;
          el.colorHue = data.colorHue;
        });
      } else {
        copied.push({
          mobileId: data.mobileId,
          scrollPos: data.scrollPos,
          colorHue: data.colorHue,
        });
      }

      return copied;
    });
  }

  console.log(scrollPoses);

  return (
    <S.Container>
      <S.ThreeContainer>
        <Canvas
          //camera pos
          camera={{
            position: [0, 0, 20],
          }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 10, 10]} intensity={1} color="white" />

          <Environment preset="forest" />
          {new Array(9).fill(0).map((_, j) => {
            return scrollPoses.map((el, i) => <El key={i} scrollPos={el.scrollPos} position={[0, (j - 4) * INTERVAL, (i - scrollPoses.length / 2) * INTERVAL]} j={j} colorHue={el.colorHue} />);
          })}

          <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
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
      </S.ThreeContainer>

      <S.QRContainer>
        <QRCodeSVG value={QR_URL} size={150} bgColor="transparent" fgColor="white" />
      </S.QRContainer>
    </S.Container>
  );
}

function El({ scrollPos, position, colorHue, j }) {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x = (scrollPos + j * 0.02) * Math.PI * 3;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, 0]}>
      <boxGeometry args={[50, 1, 1]} />
      <meshStandardMaterial attach="material" color={new THREE.Color(`hsl(${colorHue}, 100%, 50%)`)} roughness={0} metalness={1} />
    </mesh>
  );
}
