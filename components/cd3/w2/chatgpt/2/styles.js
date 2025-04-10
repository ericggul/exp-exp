import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const ChatGPTContainer = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  flex-direction: column;
  padding: 20px;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
  max-width: 600px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const ConversationContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #ffffff;
`;

export const Message = styled.div`
  background-color: ${(props) => (props.$isUser ? "#e6f3ff" : "#f1f1f1")};
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  word-wrap: break-word;
`;

export const EmptyConversation = styled.div`
  color: #999;
  text-align: center;
  padding: 20px;
`;
