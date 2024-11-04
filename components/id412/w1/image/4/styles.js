import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const ImageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const GridItem = styled.div`
  position: absolute;
  width: ${(props) => props.$imageSize}vw;
  height: ${(props) => props.$imageSize}vh;
  overflow: hidden;
  mix-blend-mode: hard-light;

  ${(props) => {
    switch (props.$index) {
      case 0:
        return `top: 0; left: 0;`;
      case 1:
        return `top: 0; right: 0;`;
      case 2:
        return `bottom: 0; left: 0;`;
      case 3:
        return `bottom: 0; right: 0;`;
      default:
        return "";
    }
  }}
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
