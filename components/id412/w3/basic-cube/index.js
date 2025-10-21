import * as S from "./styles";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Cube() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
}

export default function BasicCube() {
  return (
    <S.Container>
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <Cube />
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
} 