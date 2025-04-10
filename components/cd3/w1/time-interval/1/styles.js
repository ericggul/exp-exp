import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => `hsl(${props.$hue}, 100%, 50%)`};
  transition: background-color 0.1s ease;
`;

export const Counter = styled.div`
  font-size: 15vw;
  color: white;
  font-weight: bold;
`;
