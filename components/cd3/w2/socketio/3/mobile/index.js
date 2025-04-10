import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";
import useSocket from "utils/hooks/socket/cd3/simple/useSocketMobile";

export default function Component() {
  const socket = useSocket();
  const touchAreaRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleInteractionMove = (clientX, clientY) => {
    if (!touchAreaRef.current) return;

    const rect = touchAreaRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    socket.current.emit("simple-new-action", {
      type: "interactionMove",
      x,
      y,
    });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleInteractionMove(touch.clientX, touch.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isInteracting) return;
    handleInteractionMove(e.clientX, e.clientY);
  };

  const handleInteractionStart = () => {
    setIsInteracting(true);
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
    socket.current.emit("simple-new-action", {
      type: "interactionEnd",
    });
  };

  return (
    <S.Container>
      <h2 style={{ color: "white", marginBottom: "20px" }}>Touch/Click and Move</h2>
      <S.TouchArea
        ref={touchAreaRef}
        onTouchMove={handleTouchMove}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onMouseMove={handleMouseMove}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
      >
        Touch/Click and move here
      </S.TouchArea>
    </S.Container>
  );
}
