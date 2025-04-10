import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #0c0c0c;
`;

export const Controls = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

export const Slider = styled.input`
  width: 100%;
  accent-color: #00ff7f;
  cursor: pointer;
`;
