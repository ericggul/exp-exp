import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$gridSize}, ${100 / props.$gridSize}vw)`};
  grid-template-rows: ${(props) => `repeat(${props.$gridSize}, ${100 / props.$gridSize}vh)`};
  width: 100vw;
  height: 100vh;
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
`;
