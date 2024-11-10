import React, { useEffect, useState, useMemo, useRef } from "react";
import * as S from "./styles";
import { v4 as uuidv4 } from "uuid";
import useSocket from "utils/hooks/socket/id430/mobile-audio/useSocketScreen";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Instances, Instance } from "@react-three/drei";
import { QRCodeSVG } from "qrcode.react";
import * as THREE from "three";

const QR_URL = "https://exp-exp.onrender.com/id412/multiple-devices/mobile-audio/mobile";

export default function Component() {
  const socket = useSocket({ handleNewData });
  const mobileId = useMemo(() => uuidv4(), []);

  const [audioDatas, setAudioDatas] = useState([]);

  function handleNewData(data) {
    //audiodatas update
    setAudioDatas((arr) => {
      let copied = [...arr];
      const index = copied.findIndex((item) => item.mobileId === data.mobileId);
      if (index !== -1) {
        copied[index].audioData = data.audioData;
      } else {
        copied.push({
          mobileId: data.mobileId,
          audioData: data.audioData,
        });
      }
      return copied;
    });
  }

  return (
    <S.Container>
      <S.ThreeContainer>
        <Canvas>
          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 10, 10]} intensity={1} color="red" />
          <Environment preset="city" />
          <OrbitControls />
          {audioDatas.map((el, i) => (
            <AudioVisualizer key={i} audioData={el.audioData} position={[0, 0, (i - audioDatas.length / 2) * 0.5]} />
          ))}
        </Canvas>
      </S.ThreeContainer>
      <S.QRContainer>
        <QRCodeSVG value={QR_URL} size={150} bgColor="transparent" fgColor="white" />
      </S.QRContainer>
    </S.Container>
  );
}

function AudioVisualizer({ audioData, position }) {
  const barsRef = useRef([]);

  useFrame(() => {
    barsRef.current.forEach((bar, index) => {
      if (bar) {
        const scale = 0.1 + audioData[index] / 64;
        bar.scale.x = scale;
        bar.scale.y = scale;
        bar.scale.z = scale;
        bar.color = new THREE.Color(`hsl(${(audioData[index] / 256) * 360}, 100%, 50%)`);
      }
    });
  });

  return (
    <Instances limit={256} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[0.1, 64, 32]} />

      {/* <cylinderGeometry args={[0.05, 0.05, 1, 32]} /> */}
      <meshStandardMaterial roughness={0.2} metalness={0.7} transparent opacity={1} />
      {new Array(256).fill().map((_, i) => (
        <Instance key={i} ref={(el) => (barsRef.current[i] = el)} position={[(i - 32) * 0.15, 0, 0]} />
      ))}
    </Instances>
  );
}
