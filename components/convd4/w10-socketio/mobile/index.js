import * as S from "./styles";
import useSocketMobile from "@/utils/hooks/socket/convd4/useSocketMobile";
import { useState, useEffect } from "react";

export default function Component() {
  const socket = useSocketMobile();
  const [inputText, setInputText] = useState("");

  console.log(inputText);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("w10-text", { inputText });

    socket.current.emit("w10-hahahahaa");
  }, [inputText]);

  return (
    <S.Container>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter your text..." />
    </S.Container>
  );
}
