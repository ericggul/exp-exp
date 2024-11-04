import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50vw);
  grid-template-rows: repeat(2, 50vh);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const GridItem = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
