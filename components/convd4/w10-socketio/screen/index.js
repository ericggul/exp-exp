import * as S from "./styles";
import useSocketScreen from "@/utils/hooks/socket/convd4/useSocketScreen";
import { useState } from "react";

export default function Component() {
  const socket = useSocketScreen({ handleNewText });

  const [text, setText] = useState("");

  function handleNewText(data) {
    console.log("new w10 text", data);
    setText(data.inputText);
  }

  return <S.Container>{text}</S.Container>;
}
