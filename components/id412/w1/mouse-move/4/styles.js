import { WholeContainer } from "styles/common";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(5px, -5px); }
  50% { transform: translate(10px, 5px); }
  75% { transform: translate(-5px, 10px); }
`;

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle at var(--gradient-x, 50%) var(--gradient-y, 50%), hsl(var(--hue1, 200), 30%, 80%) 0%, hsl(var(--hue2, 260), 40%, 70%) 100%);
  transition: background 1s ease;
  cursor: none;
`;

export const AbstractShape = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40vmin;
  height: 40vmin;
  transform: translate(-50%, -50%) translate(var(--translate-x, 0), var(--translate-y, 0)) scale(var(--scale, 1)) rotate(var(--rotate, 0));
  transition: transform 0.3s ease;
  pointer-events: none;
`;

export const ShapeInner = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: ${float} 20s infinite ease-in-out;
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: inherit;
    opacity: 0.5;
  }

  &::before {
    transform: scale(1.2) rotate(45deg);
  }

  &::after {
    transform: scale(0.8) rotate(-45deg);
  }
`;
