import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000814;
`;

export const InfoPanel = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: rgba(0, 8, 20, 0.8);
  border: 1px solid rgba(100, 155, 255, 0.4);
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  color: white;
  box-shadow: 0 0 20px rgba(50, 120, 255, 0.3);
  transition: all 0.3s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? "translateY(0)" : "translateY(-20px)")};
  pointer-events: ${(props) => (props.visible ? "all" : "none")};
  z-index: 100;
`;

export const InfoTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #00aaff;
`;

export const InfoDescription = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
`;

export const TimeControls = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80%;
  max-width: 500px;
  background-color: rgba(0, 8, 20, 0.8);
  border: 1px solid rgba(100, 155, 255, 0.4);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  z-index: 100;
`;

export const YearDisplay = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #00aaff;
  margin-bottom: 10px;
`;

export const Slider = styled.input`
  width: 100%;
  height: 5px;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 5px;
  background: #333;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00aaff;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00aaff;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    background: #77ccff;
    transform: scale(1.2);
  }

  &::-moz-range-thumb:hover {
    background: #77ccff;
    transform: scale(1.2);
  }
`;
