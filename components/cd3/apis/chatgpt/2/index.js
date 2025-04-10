import { useState } from "react";
import * as S from "./styles";

export default function ChatGPT() {
  const [systemContent, setSystemContent] = useState("");
  const [userContent, setUserContent] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    if (userContent.trim() === "") return;

    setIsLoading(true);
    const newMessage = { role: "user", content: userContent };
    const updatedConversation = [...conversation, newMessage];

    try {
      const response = await fetch("/api/openai/gpt-conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemContent,
          conversation: updatedConversation,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = { role: "assistant", content: data.text };
      setConversation([...updatedConversation, aiResponse]);
      setUserContent("");
    } catch (error) {
      console.error("Failed to fetch data from OpenAI", error);
    } finally {
      setIsLoading(false);
    }
  }

  function clearConversation() {
    setConversation([]);
  }

  return (
    <S.ChatGPTContainer>
      <S.Title>Chat with GPT-4o</S.Title>
      <S.InputGroup>
        <S.Label>
          System Prompt:
          <S.Input type="text" value={systemContent} onChange={(e) => setSystemContent(e.target.value)} />
        </S.Label>
      </S.InputGroup>
      <S.ConversationContainer>
        {conversation.map((message, index) => (
          <S.Message key={index} $isUser={message.role === "user"}>
            <strong>{message.role === "user" ? "You: " : "AI: "}</strong>
            {message.content}
          </S.Message>
        ))}
      </S.ConversationContainer>
      <S.InputGroup>
        <S.Label>
          Your message:
          <S.Input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
        </S.Label>
      </S.InputGroup>
      <S.ButtonGroup>
        <S.Button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </S.Button>
        <S.Button onClick={clearConversation}>Clear Conversation</S.Button>
      </S.ButtonGroup>
    </S.ChatGPTContainer>
  );
}
