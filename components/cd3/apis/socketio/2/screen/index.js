import React, { useState, useEffect, useCallback, useRef } from "react";
import * as S from "./styles";
import useSocket from "utils/hooks/socket/cd3/simple/useSocketScreen";

export default function Component() {
  const [chatHistory, setChatHistory] = useState([]);
  const processingRef = useRef(false);

  const handleNewAction = useCallback(async (data) => {
    if (processingRef.current) return; // Prevent duplicate processing
    processingRef.current = true;

    try {
      if (data.type === "chatRequest") {
        const { systemContent, userContent } = data;

        // Add user message to chat history
        setChatHistory((prev) => [...prev, { role: "user", content: userContent }]);

        // Call GPT API
        const response = await fetch("/api/openai/gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemContent,
            userContent,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // Add GPT response to chat history
        setChatHistory((prev) => [...prev, { role: "assistant", content: responseData.text }]);
      }
    } catch (e) {
      console.log(e);
      setChatHistory((prev) => [...prev, { role: "error", content: "An error occurred while processing your request." }]);
    } finally {
      processingRef.current = false;
    }
  }, []);

  const socket = useSocket({
    handleNewAction,
  });

  useEffect(() => {
    // Clean up function to remove event listener when component unmounts
    return () => {
      if (socket.current) {
        socket.current.off("new-simple-action", handleNewAction);
      }
    };
  }, [handleNewAction]);

  return (
    <S.Container>
      <h1 style={{ color: "white" }}>Chat Screen</h1>
      <S.ChatContainer>
        {chatHistory.map((message, index) => (
          <S.MessageBubble key={index} role={message.role}>
            <strong>{message.role === "user" ? "User:" : "GPT:"}</strong> {message.content}
          </S.MessageBubble>
        ))}
      </S.ChatContainer>
    </S.Container>
  );
}
