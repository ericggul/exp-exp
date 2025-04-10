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
