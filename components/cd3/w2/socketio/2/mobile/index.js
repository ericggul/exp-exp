import React, { useState } from "react";
import * as S from "./styles";
import useSocket from "utils/hooks/socket/cd3/simple/useSocketMobile";

export default function Component() {
  const socket = useSocket();
  const [systemContent, setSystemContent] = useState("");
  const [userContent, setUserContent] = useState("");

  const handleSubmit = () => {
    if (systemContent && userContent) {
      socket.current.emit("simple-new-action", {
        type: "chatRequest",
        systemContent,
        userContent,
      });
      setUserContent(""); // Clear user input after sending
    }
  };

  return (
    <S.Container>
      <h2 style={{ color: "white", marginBottom: "20px" }}>Chat with GPT</h2>
      <S.InputGroup>
        <S.Label>System:</S.Label>
        <S.Input type="text" value={systemContent} onChange={(e) => setSystemContent(e.target.value)} placeholder="Enter system content" />
      </S.InputGroup>
      <S.InputGroup>
        <S.Label>User:</S.Label>
        <S.Input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} placeholder="Enter your message" />
      </S.InputGroup>
      <S.Button onClick={handleSubmit}>Send</S.Button>
    </S.Container>
  );
}
