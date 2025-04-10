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
  overflow-x: hidden;
  overflow-y: auto;
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
  margin-bottom: 1.5rem;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
`;

export const TabButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.active ? "#3b82f6" : "#64748b")};
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${(props) => (props.active ? "#3b82f6" : "transparent")};
    border-radius: 3px 3px 0 0;
  }

  &:hover {
    color: #3b82f6;
  }
`;

// Generate Tab
export const GenerateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const PromptSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ContextSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #0f172a;
  font-size: 0.9rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const PromptForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: -0.25rem;
`;

export const GenerateButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const PromptSuggestions = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: white;
`;

export const SuggestionLabel = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: #475569;
`;

export const SuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SuggestionChip = styled.button`
  background-color: #f1f5f9;
  color: #475569;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
    transform: translateY(-1px);
  }
`;

export const ResultsSection = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

// Loading animation
const spinner = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
`;

export const LoadingIndicator = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;

  div {
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #3b82f6;
    border-radius: 50%;
    animation: ${spinner} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #3b82f6 transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export const LoadingText = styled.p`
  color: #64748b;
  font-size: 1rem;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const GeneratedImage = styled.img`
  width: 100%;
  flex-grow: 1;
  object-fit: contain;
  background-color: #f8fafc;
`;

export const ImageInfo = styled.div`
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const PromptUsed = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`;

export const DownloadLink = styled.a`
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyState = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  padding: 2rem;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const EmptyStateText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

// History Tab
export const HistoryContainer = styled.div`
  width: 100%;
`;

export const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

export const HistoryItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const HistoryImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const HistoryInfo = styled.div`
  padding: 1rem;
`;

export const HistoryPrompt = styled.p`
  font-size: 0.875rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const HistoryTimestamp = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
`;

// Design Tips
export const DesignTips = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  max-width: 800px;
  align-self: center;
  width: 100%;
`;

export const TipsTitle = styled.h3`
  color: #0f172a;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const TipsList = styled.ul`
  padding-left: 1.5rem;
`;

export const Tip = styled.li`
  color: #334155;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;
