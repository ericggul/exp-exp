import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
    flex-direction: column;

  background: black;

  p {
    color: white;
    font-size: 1rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  cursor: none;

  input {
    //simple input styling
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    text-align: center;
    width: 80vw;
    padding: 5px;
    outline: none;

    border-bottom: 1px solid white;
  }
`;

export const Start = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  background: black;
  position: fixed;
  z-index: 100;
  color: white;
`;
