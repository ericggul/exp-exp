import React, { useState, useCallback } from "react";
import * as S from "./styles";
import useSocket from "utils/hooks/socket/cd3/simple/useSocketScreen";

export default function Component() {
  const [circlePosition, setCirclePosition] = useState({ x: 50, y: 50, size: 100 });

  const handleNewAction = useCallback((data) => {
    if (data.type === "interactionMove") {
      setCirclePosition({
        x: data.x * 100,
        y: data.y * 100,
        size: (data.x + data.y) * 50 + 50, // Size changes based on position
      });
    }
  }, []);

  const socket = useSocket({
    handleNewAction,
  });

  return (
    <S.Container>
      <h1 style={{ color: "white", position: "absolute", top: "20px" }}>Interactive Screen</h1>
      <S.InteractiveArea>
        <S.InteractiveCircle
          style={{
            left: `${circlePosition.x}%`,
            top: `${circlePosition.y}%`,
            width: `${circlePosition.size}px`,
            height: `${circlePosition.size}px`,
          }}
        />
      </S.InteractiveArea>
    </S.Container>
  );
}
