import { WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: white;
  cursor: none;
`;

export const KaonashiImage = styled.img`
  position: absolute;
  width: 150px; /* Adjust the size as needed */
  height: auto;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;
