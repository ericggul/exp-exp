import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 15px;
  width: 95vmin;
  height: 95vmin;
  padding: 20px;
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 255, 0, 0.2);
`;

export const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Counter = styled.div`
  font-size: 15vw;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
