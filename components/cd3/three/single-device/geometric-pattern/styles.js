import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f8f9fa;
`;

export const Controls = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? "#0066ff" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => (props.active ? "#0052cc" : "#f0f0f0")};
  }
`;
