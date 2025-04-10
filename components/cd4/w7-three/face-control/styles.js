import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
    flex-direction: column;

  canvas {
    width: 100%;
    height: 100%;
  }
`;
