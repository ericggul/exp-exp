import { useState } from "react";
import * as S from "./styles";

export default function ChatGPT() {
  const [systemContent, setSystemContent] = useState("");
  const [userContent, setUserContent] = useState("");
  const [response, setResponse] = useState("");

  async function fetchData() {
    if (systemContent && userContent) {
      try {
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

        const data = await response.json();
        setResponse(data.text);
      } catch (error) {
        console.error("Failed to fetch data from OpenAI", error);
      }
    }
  }

  return (
    <S.ChatGPTContainer>
      <S.Title>Chat with GPT-4o</S.Title>
      <S.InputGroup>
        <S.Label>
          System:
          <S.Input type="text" value={systemContent} onChange={(e) => setSystemContent(e.target.value)} />
        </S.Label>
      </S.InputGroup>
      <S.InputGroup>
        <S.Label>
          User:
          <S.Input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} />
        </S.Label>
      </S.InputGroup>
      <S.Button onClick={fetchData}>Enter</S.Button>

      {response && (
        <S.ResponseSection>
          <S.ResponseTitle>Response:</S.ResponseTitle>
          <S.ResponseText>{response}</S.ResponseText>
        </S.ResponseSection>
      )}
    </S.ChatGPTContainer>
  );
}
