import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000000;
`;

export const Controls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 8px;
`;

export const ControlGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.active ? "#ff00ff" : "rgba(40, 40, 40, 0.8)")};
  color: ${(props) => (props.active ? "white" : "#bbbbbb")};
  border: 1px solid ${(props) => (props.active ? "#ff00ff" : "#444444")};
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#ff00ff" : "#444444")};
    color: white;
  }
`;
