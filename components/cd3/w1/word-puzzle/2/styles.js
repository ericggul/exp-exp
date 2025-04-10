import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const PuzzleContainer = styled.div`
  width: 100vw;
  ${FlexCenterStyle};
  flex-direction: column;

  font-family: "Times New Roman", Times, serif;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 24px;
`;

export const ScoreDisplay = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const GridWrapper = styled.div`
  width: 100vw;
  height: 100vw;
  overflow: auto;
  border: 1px solid #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(100, 1vw);
  grid-template-rows: repeat(100, 1vw);
  width: 100vw;
  height: 100vw;
  margin: 0;
`;

export const Cell = styled.div`
  width: 1vw;
  height: 1vw;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.3vw;
  mix-blend-mode: difference;
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? "#f0f0f0" : "white")};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

export const Button = styled.button`
  background-color: white;
  border: 1px solid #333;
  color: #333;
  padding: 5px 10px;
  text-align: center;
  font-size: 14px;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
  }
`;

export const Message = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: ${(props) => (props.children.startsWith("You found") ? "#006400" : "#8B0000")};
`;

export const WordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  max-width: 100vw;
`;

export const Word = styled.span`
  font-size: 14px;
  color: ${(props) => (props.$found ? "#006400" : "#333")};
  text-decoration: ${(props) => (props.$found ? "line-through" : "none")};
`;
