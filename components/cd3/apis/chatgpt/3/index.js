import React, { useState, useRef, useEffect } from "react";
import * as S from "./styles";

export default function ChatGPT() {
  const [systemContent, setSystemContent] = useState("You are a helpful assistant for a design student.");
  const [userContent, setUserContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function sendMessage(e) {
    e?.preventDefault();

    if (!userContent.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: userContent }];
    setMessages(newMessages);

    // Clear input field
    const currentUserContent = userContent;
    setUserContent("");

    // Show loading state
    setIsLoading(true);

    try {
      const response = await fetch("/api/openai/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemContent,
          userContent: currentUserContent,
          // Optionally include previous messages for context
          // previousMessages: messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add assistant response to chat
      setMessages([...newMessages, { role: "assistant", content: data.text }]);
    } catch (error) {
      console.error("Failed to fetch data from OpenAI", error);
      // Add error message to chat
      setMessages([
        ...newMessages,
        {
          role: "system",
          content: "Sorry, there was an error communicating with the AI. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  // Clever prompt ideas for designers
  const promptSuggestions = [
    "Design a logo for a sustainable fashion brand",
    "Suggest color palettes for a children's educational app",
    "What are current typography trends in web design?",
    "How can I apply gestalt principles to my interface design?",
    "Explain the difference between UX and UI design",
  ];

  const handleSuggestionClick = (suggestion) => {
    setUserContent(suggestion);
    inputRef.current?.focus();
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Chat with GPT-4o</S.Title>
        <S.Subtitle>Explore design concepts, get feedback, and learn design principles</S.Subtitle>
        <S.SystemPromptToggle onClick={() => setShowSystemPrompt(!showSystemPrompt)} active={showSystemPrompt}>
          {showSystemPrompt ? "Hide System Prompt" : "Show System Prompt"}
        </S.SystemPromptToggle>
      </S.Header>

      {showSystemPrompt && (
        <S.SystemPromptSection>
          <S.Label>System Prompt:</S.Label>
          <S.SystemPromptInput value={systemContent} onChange={(e) => setSystemContent(e.target.value)} placeholder="Instruct the AI on how to respond..." />
          <S.SystemPromptHint>The system prompt defines the AI's behavior. Try "You are a branding expert" or "You are a UI design mentor".</S.SystemPromptHint>
        </S.SystemPromptSection>
      )}

      <S.ChatContainer>
        <S.PromptSuggestions>
          <S.SuggestionLabel>Try asking about:</S.SuggestionLabel>
          <S.SuggestionsWrapper>
            {promptSuggestions.map((suggestion, index) => (
              <S.SuggestionChip key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </S.SuggestionChip>
            ))}
          </S.SuggestionsWrapper>
        </S.PromptSuggestions>

        <S.MessagesContainer>
          {messages.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>💬</S.EmptyStateIcon>
              <S.EmptyStateText>Ask the AI anything about design!</S.EmptyStateText>
            </S.EmptyState>
          ) : (
            messages.map((message, index) => (
              <S.Message key={index} role={message.role}>
                <S.MessageAvatar role={message.role}>{message.role === "user" ? "👤" : message.role === "assistant" ? "🤖" : "⚠️"}</S.MessageAvatar>
                <S.MessageContent>
                  {message.content.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== message.content.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </S.MessageContent>
              </S.Message>
            ))
          )}
          {isLoading && (
            <S.Message role="assistant">
              <S.MessageAvatar role="assistant">🤖</S.MessageAvatar>
              <S.MessageContent>
                <S.LoadingDots>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </S.LoadingDots>
              </S.MessageContent>
            </S.Message>
          )}
          <div ref={chatEndRef} />
        </S.MessagesContainer>

        <S.InputForm onSubmit={sendMessage}>
          <S.UserInput ref={inputRef} type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} placeholder="Ask about design principles, color theory, etc." />
          <S.SendButton type="submit" disabled={!userContent.trim() || isLoading}>
            Send
          </S.SendButton>
        </S.InputForm>
      </S.ChatContainer>
    </S.Container>
  );
}
