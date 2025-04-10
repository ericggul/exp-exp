import React, { useEffect, useState, useRef, useCallback } from "react";
import * as S from "./styles";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, FaceLandmarker, FaceControls, OrbitControls, useGLTF, Stats } from "@react-three/drei";

export default function Component() {
  return (
    <S.Container>
      <Canvas>
        <FaceLandmarker>
          <ThreeScene />
        </FaceLandmarker>
      </Canvas>
    </S.Container>
  );
}

function ThreeScene() {
  const { nodes, materials } = useGLTF("/assets/id430/faces/test1.glb");

  const controls = useThree((state) => state.controls);
  const onVideoFrame = useCallback(
    (e) => {
      try {
        controls.detect(e.texture.source.data, e.time);
        console.log(e.texture);
      } catch (e) {
        console.log(e);
      }
    },
    [controls]
  );

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Environment preset="lobby" background />
      <mesh castShadow receiveShadow geometry={nodes.imageobj.geometry} material={nodes.imageobj.material} />

      <FaceControls offsetScalar={15} onVideoFrame={onVideoFrame} />

      <Stats />
    </>
  );
}
