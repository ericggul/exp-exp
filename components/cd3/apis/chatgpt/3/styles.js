import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
   0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const randomRotation = () => css`
  transform: rotate(${Math.random() * 5 - 2.5}deg);
`;

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const randomBgColor = () => `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`;

const randomBorderRadius = () => `${Math.random() * 20}px`;

export const ChatGPTContainer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;
  padding: 10px;
  background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00);
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 20px;
  transform: skew(-15deg);
  text-shadow: 3px 3px 0 #ff00ff, 6px 6px 0 #00ffff;
`;

export const InputGroup = styled.div`
  margin-bottom: 10px;
  width: 100%;
  max-width: 600px;
  ${randomRotation}
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 3px;
  font-weight: bold;
  font-size: 12px;
  color: ${randomColor};
`;

export const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 3px dashed #ccc;
  border-radius: 20px;
  font-size: 12px;
  background-color: ${randomBgColor};
`;

export const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 1px;
  cursor: pointer;
  border-radius: 50%;
  transform: scale(${0.8 + Math.random() * 0.4});
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.1) rotate(${Math.random() * 360}deg);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  animation: ${float} 5s ease-in-out infinite;
`;

// export const ConversationContainer = styled.div`
//   width: 100%;
//   max-width: 600px;
//   height: 400px;
//   overflow-y: auto;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 20px;
//   background-color: #ffffff;
// `;

export const Message = styled.div`
  background-color: ${(props) => (props.$isUser ? "#e6f3ff" : "#f1f1f1")};
  padding: 4px;
  border-radius: 4px;
  margin-bottom: 4px;
  word-wrap: break-word;
  font-size: 10px;
  ${randomRotation}
  box-shadow: ${() => `${Math.random() * 5}px ${Math.random() * 5}px 0 rgba(0,0,0,0.1)`};
`;

export const EmptyConversation = styled.div`
  color: #999;
  text-align: center;
  padding: 5px;
  font-size: 10px;
  font-style: italic;
  transform: skew(${Math.random() * 10 - 5}deg);
`;

export const ConversationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 1200px;
  transform: perspective(500px) rotateX(${Math.random() * 10 - 5}deg);
`;

export const ConversationWrapper = styled.div`
  border: 2px solid ${randomColor};
  padding: 5px;
  background-color: rgba(249, 249, 249, 0.7);
  display: flex;
  flex-direction: column;
  height: 200px;
  ${randomRotation}
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05) rotate(${Math.random() * 5 - 2.5}deg);
  }
`;

export const ConversationTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
  text-decoration: underline wavy ${randomColor};
`;

export const ConversationContainer = styled.div`
  height: 100px;
  overflow-y: auto;
  border: 1px dotted #ccc;
  border-radius: ${randomBorderRadius};
  padding: 5px;
  margin-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  flex-grow: 1;
  transform: skew(${Math.random() * 5 - 2.5}deg);
`;
