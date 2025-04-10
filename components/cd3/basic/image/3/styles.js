import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

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

export const GridItem = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: ${(props) => `scaleX(${props.$reverseX ? -1 : 1}) scaleY(${props.$reverseY ? -1 : 1})`};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
