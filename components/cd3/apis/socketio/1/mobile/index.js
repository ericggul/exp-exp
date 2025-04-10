import React, { useState } from "react";
import * as S from "./styles";
import useSocket from "utils/hooks/socket/cd3/simple/useSocketMobile";

export default function Component() {
  const socket = useSocket();
  const [color, setColor] = useState("#000000");

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    socket.current.emit("simple-new-action", { type: "changeColor", color: newColor });
  };

  return (
    <S.Container>
      <h2 style={{ color: "white", marginBottom: "20px" }}>Change Screen Color</h2>
      <input type="color" value={color} onChange={handleColorChange} style={{ width: "100px", height: "100px" }} />
      <p style={{ color: "white", marginTop: "20px" }}>Selected Color: {color}</p>
    </S.Container>
  );
}
