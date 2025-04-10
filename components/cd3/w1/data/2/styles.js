import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: relative;
`;

export const Counter = styled.div`
  font-size: 15vw;
  color: white;
  font-weight: bold;
`;

export const DateDisplay = styled.div`
  font-size: 2vw;
  color: white;
  margin-top: 20px;
  position: absolute;
  bottom: 3vw;
  font-family: cursive;
`;

export const StartButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  font-size: 1.5vw;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;
