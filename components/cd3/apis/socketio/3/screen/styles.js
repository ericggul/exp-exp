import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: relative;
  background: black;
  overflow: hidden;
`;

export const InteractiveArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const InteractiveCircle = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transition: all 0.1s ease-out;
`;
