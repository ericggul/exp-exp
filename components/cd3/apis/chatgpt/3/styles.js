import { WholeContainer } from "styles/common";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  ${WholeContainer};
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #334155;
  padding: 2rem;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 2.5rem;
`;

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

export const SystemPromptToggle = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.active ? "#3b82f6" : "#64748b")};
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0.5rem;

  &:hover {
    color: #3b82f6;
  }
`;

export const SystemPromptSection = styled.div`
  margin-bottom: 1.5rem;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  align-self: center;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #0f172a;
  font-size: 0.9rem;
`;

export const SystemPromptInput = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const SystemPromptHint = styled.p`
  color: #94a3b8;
  font-size: 0.8rem;
  font-style: italic;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 800px;
  width: 100%;
  align-self: center;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const PromptSuggestions = styled.div`
  padding: 1rem;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
`;

export const SuggestionLabel = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: #64748b;
`;

export const SuggestionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SuggestionChip = styled.button`
  background-color: #e2e8f0;
  color: #475569;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #cbd5e1;
    transform: translateY(-1px);
  }
`;

export const MessagesContainer = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 50vh;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const EmptyState = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const EmptyStateText = styled.p`
  font-size: 1.1rem;
`;

export const Message = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${(props) => (props.role === "user" ? "#f1f5f9" : props.role === "assistant" ? "#f8fafc" : "#fee2e2")};
  border-left: 4px solid ${(props) => (props.role === "user" ? "#3b82f6" : props.role === "assistant" ? "#10b981" : "#ef4444")};
`;

export const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.role === "user" ? "#bfdbfe" : props.role === "assistant" ? "#d1fae5" : "#fecaca")};
  color: ${(props) => (props.role === "user" ? "#1e40af" : props.role === "assistant" ? "#065f46" : "#b91c1c")};
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const MessageContent = styled.div`
  flex-grow: 1;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const dotPulse = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

export const LoadingDots = styled.div`
  display: flex;
  align-items: center;

  span {
    height: 6px;
    width: 6px;
    margin-right: 4px;
    background-color: #94a3b8;
    border-radius: 50%;
    display: inline-block;
    animation: ${dotPulse} 1.5s infinite;

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }
`;

export const InputForm = styled.form`
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  border-top: 1px solid #e2e8f0;
`;

export const UserInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const SendButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;
