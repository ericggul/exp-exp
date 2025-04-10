import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";
export const ImageContainer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
`;

export const StyledImage = styled.img`
  object-fit: cover;
`;
