import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: absolute !important;

  background: black;
  cursor: none;
  canvas {
    width: 100%;
    height: 100vh;
  }
`;

export const ChatContainer = styled.div`
  width: 80%;
  height: 70vh;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

export const MessageBubble = styled.div`
  background-color: ${(props) => (props.role === "user" ? "rgba(0, 0, 255, 0.2)" : "rgba(0, 255, 0, 0.2)")};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  color: white;
`;
