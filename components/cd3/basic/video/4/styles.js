import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const VideoGrid = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const VideoContainer = styled.div`
  position: absolute;
  top: ${(props) => (props.$index % 4) * 1}vh;
  left: ${(props) => Math.floor(props.$index / 4) * 1}vw;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  mix-blend-mode: hard-light;
`;

export const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: none;
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  border: none;
  cursor: pointer;
  z-index: 10;
`;
