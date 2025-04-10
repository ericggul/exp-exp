import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$gridSize}, ${100 / props.$gridSize}vw)`};
  grid-template-rows: ${(props) => `repeat(${props.$gridSize}, ${100 / props.$gridSize}vh)`};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 1 / 1;
`;

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: black;
`;

export const GridItem = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: 50vw;
  height: 50vh;
  overflow: hidden;
  mix-blend-mode: ${(props) => props.$blendMode};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageLayer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  mix-blend-mode: ${(props) => props.$blendMode};
  opacity: ${(props) => props.$opacity};
  transform: translate(-50%, -50%) translate(${(props) => props.$positionX}%, ${(props) => props.$positionY}%) scale(${(props) => props.$scale});
  transition: all 3s ease-in-out;
`;
