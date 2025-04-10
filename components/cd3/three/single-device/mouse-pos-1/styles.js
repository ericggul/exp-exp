import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
    flex-direction: column;

  // background: black;
  cursor: none;
  canvas {
    width: 100%;
    height: 100%;
  }
`;
