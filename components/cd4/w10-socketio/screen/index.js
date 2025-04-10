import * as S from "./styles";
import useSocketScreen from "@/utils/hooks/socket/cd4/useSocketScreen";
import { useState } from "react";

export default function Component() {
  const socket = useSocketScreen({ handleNewText, handleNewColor, handleNewData });

  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [data, setData] = useState(0);

  function handleNewText(data) {
    console.log("new w10 text", data);
    setText(data.inputText);
  }

  function handleNewColor(data) {
    console.log("new w10 color", data);
    setColor(data.color);
  }

  function handleNewData(data) {
    console.log("new w10 data", data);
    setData(data.data);
  }

  return (
    <S.Container style={{ backgroundColor: color }}>
      {text} {data}
    </S.Container>
  );
}
