import * as S from "./styles";
import useSocketMobile from "@/utils/hooks/socket/cd4/useSocketMobile";
import { useState, useEffect } from "react";

export default function Component() {
  const socket = useSocketMobile();
  const [inputText, setInputText] = useState("");
  const [color, setColor] = useState("#00ff00");
  const [data, setData] = useState(370);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("w10-text", { inputText });
  }, [inputText]);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("w10-color", { color });
  }, [color]);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("w10-data", { data });
  }, [data]);

  return (
    <S.Container>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter your text..." />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input type="number" value={data} onChange={(e) => setData(Number(e.target.value))} placeholder="Enter TSLA value..." />
    </S.Container>
  );
}
