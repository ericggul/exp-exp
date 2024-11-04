import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@/styles/common";

export const Container = styled.div`
  background: black;
  ${WholeContainer}
  ${FlexCenterStyle}
`;

export const Counter = styled.div`
  font-size: 4vw;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  ${FlexCenterStyle}
  mix-blend-mode: difference;
  -webkit-mix-blend-mode: difference;
`;

export const Circle = styled.div`
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  margin: auto;
  ${FlexCenterStyle}
  mix-blend-mode: difference;
  -webkit-mix-blend-mode: difference;
`;

export const DateDisplay = styled.div`
  font-size: 2vw;
  color: white;
  margin-top: 20px;
  position: absolute;
  bottom: 3vw;
  font-family: cursive;
  mix-blend-mode: difference;
  -webkit-mix-blend-mode: difference;
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
