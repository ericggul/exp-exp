import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f7f9fc;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  font-weight: 700;
`;

export const ImageContainer = styled.div`
  width: 80%;
  max-width: 600px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: filter 0.5s ease;

  /* Apply different filter effects based on the prop */
  ${(props) => {
    switch (props.effect) {
      case "grayscale":
        return "filter: grayscale(100%);";
      case "blur":
        return "filter: blur(5px);";
      case "sepia":
        return "filter: sepia(100%);";
      case "saturate":
        return "filter: saturate(200%);";
      default:
        return "filter: none;";
    }
  }}
`;

export const ControlsContainer = styled.div`
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Description = styled.p`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.6;

  code {
    background-color: #f0f0f0;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    color: #e63946;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

export const EffectButton = styled.button`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  background-color: ${(props) => (props.active ? "#4361ee" : "#e9ecef")};
  color: ${(props) => (props.active ? "white" : "#495057")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#3a56d4" : "#dee2e6")};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
