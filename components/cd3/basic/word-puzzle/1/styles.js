import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const PuzzleContainer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;
  padding: 20px;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export const ScoreDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Grid = styled.div`
  display: inline-block;
  border: 2px solid #333;
  margin-bottom: 20px;
`;

export const Row = styled.div`
  display: flex;
`;

export const Cell = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? "#ffff99" : "white")};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const Message = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  color: ${(props) => (props.children.startsWith("You found") ? "green" : "red")};
`;

export const WordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const Word = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.$found ? "green" : "black")};
  text-decoration: ${(props) => (props.$found ? "line-through" : "none")};
`;
