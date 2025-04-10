import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  // ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
`;

export const ScrollContainer = styled.div`
  width: 100%;
  height: 6000vh;
  overflow-y: scroll;
  pointer-events: auto;

  background: linear-gradient(
    to bottom,
    hsl(${({ colorHue }) => colorHue}, 100%, 50%) 0%,
    hsl(${({ colorHue }) => colorHue}, 10%, 50%) 10%,
    hsl(${({ colorHue }) => colorHue}, 100%, 50%) 20%,
    hsl(${({ colorHue }) => colorHue}, 10%, 50%) 30%,
    hsl(${({ colorHue }) => colorHue}, 100%, 50%) 40%,
    hsl(${({ colorHue }) => colorHue}, 10%, 50%) 50%,
    hsl(${({ colorHue }) => colorHue}, 100%, 50%) 60%,
    hsl(${({ colorHue }) => colorHue}, 10%, 50%) 70%,
    hsl(${({ colorHue }) => colorHue}, 100%, 50%) 80%,
    hsl(${({ colorHue }) => colorHue}, 10%, 50%) 90%,
    hsl(${({ colorHue }) => colorHue}, 100%, 50%) 100%
  );
`;

export const Static = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  position: fixed;
  pointer-events: none;
  color: black;
  font-size: 2rem;
`;
