import styled from "styled-components";

export const Container = styled.div`
  position: fixed; /* Cover the entire viewport */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: black;
  cursor: none; /* Hide the cursor */
`;

export const KaonashiImage = styled.img`
  position: absolute;
  width: 150px; /* Adjust as needed */
  height: auto;
  pointer-events: none;
  will-change: transform;
  transform: translate(-50%, -50%);
`;
