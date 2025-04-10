import { WholeContainer } from "styles/common";
import styled from "styled-components";

export const VideoContainer = styled.div`
  ${WholeContainer};
  position: relative;
  overflow: hidden;
`;

export const StyledIframe = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  position: relative;
`;

export const Circle = styled.div`
  position: absolute;
  width: 10vmin;
  height: 10vmin;
  border-radius: 50%;
  background-color: white;
  transform: translate(-50%, -50%) scale(1);
  will-change: transform;
`;
