import React, { useState } from "react";
import * as S from "./styles";
import useSocket from "utils/hooks/socket/cd3/simple/useSocketScreen";

export default function Component() {
  const [backgroundColor, setBackgroundColor] = useState("black");

  const handleNewAction = (data) => {
    try {
      if (data.type === "changeColor") {
        setBackgroundColor(data.color);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const socket = useSocket({
    handleNewAction,
  });

  return (
    <S.Container style={{ background: backgroundColor }}>
      <h1 style={{ color: "white" }}>Screen</h1>
      <p style={{ color: "white" }}>Current Color: {backgroundColor}</p>
    </S.Container>
  );
}
