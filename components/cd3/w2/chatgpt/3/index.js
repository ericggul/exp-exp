import React, { useState, useCallback, useEffect, useMemo } from "react";
import * as S from "./styles";

const NUM_CONVERSATIONS = 10;

const Conversation = React.memo(({ conversation }) => {
  return (
    <S.ConversationWrapper>
      <S.ConversationTitle>Conversation {conversation.id}</S.ConversationTitle>
      <S.ConversationContainer>
        {conversation.messages.map((message, index) => (
          <S.Message key={index} $isUser={message.role === "user"}>
            <strong>{message.role === "user" ? "You: " : "AI: "}</strong>
            {message.content}
          </S.Message>
        ))}
      </S.ConversationContainer>
    </S.ConversationWrapper>
  );
});

function useConversations() {
  const [conversations, setConversations] = useState(() =>
    Array(NUM_CONVERSATIONS)
      .fill(null)
      .map((_, i) => ({ id: i + 1, messages: [] }))
  );

  const addMessageToAll = useCallback((message) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) => ({
        ...conv,
        messages: [...conv.messages, message],
      }))
    );
  }, []);

  const addResponseToConversation = useCallback((id, response) => {
    setConversations((prevConversations) => prevConversations.map((conv) => (conv.id === id ? { ...conv, messages: [...conv.messages, response] } : conv)));
  }, []);

  const clearAllConversations = useCallback(() => {
    setConversations((prevConversations) => prevConversations.map((conv) => ({ ...conv, messages: [] })));
  }, []);

  return {
    conversations,
    addMessageToAll,
    addResponseToConversation,
    clearAllConversations,
  };
}

async function fetchAIResponse(systemContent, conversation) {
  const response = await fetch("/api/openai/gpt-conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemContent,
      conversation,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return { role: "assistant", content: data.text };
}

export default function ChatGPT() {
  const [systemContent, setSystemContent] = useState("");
  const [userContent, setUserContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { conversations, addMessageToAll, addResponseToConversation, clearAllConversations } = useConversations();

  const sendMessage = useCallback(async () => {
    if (userContent.trim() === "") return;

    setIsLoading(true);
    const newMessage = { role: "user", content: userContent };
    addMessageToAll(newMessage);

    try {
      await Promise.all(
        conversations.map(async (conv) => {
          const aiResponse = await fetchAIResponse(systemContent, [...conv.messages, newMessage]);
          addResponseToConversation(conv.id, aiResponse);
        })
      );
      setUserContent("");
    } catch (error) {
      console.error("Failed to fetch data from OpenAI", error);
    } finally {
      setIsLoading(false);
    }
  }, [systemContent, userContent, conversations, addMessageToAll, addResponseToConversation]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !isLoading) {
        sendMessage();
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [sendMessage, isLoading]);

  const memoizedConversations = useMemo(() => conversations, [conversations]);

  return (
    <S.ChatGPTContainer>
      <S.Title>Chat with GPT-4o (Multiple Conversations)</S.Title>
      <S.InputGroup>
        <S.Label>
          System Prompt:
          <S.Input type="text" value={systemContent} onChange={(e) => setSystemContent(e.target.value)} />
        </S.Label>
      </S.InputGroup>
      <S.ConversationsGrid>
        {memoizedConversations.map((conv) => (
          <Conversation key={conv.id} conversation={conv} />
        ))}
      </S.ConversationsGrid>
      <S.InputGroup>
        <S.Label>
          Your message:
          <S.Input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} />
        </S.Label>
      </S.InputGroup>
      <S.ButtonGroup>
        <S.Button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send to All"}
        </S.Button>
        <S.Button onClick={clearAllConversations}>Clear All</S.Button>
      </S.ButtonGroup>
    </S.ChatGPTContainer>
  );
}
