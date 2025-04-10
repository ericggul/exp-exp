import io from "socket.io-client";

import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewText, handleNewOrientation }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      socket.current.emit("mobile-letter-screen-init");
      socket.current.on("new-mobile-letter-text", handleNewText);
      socket.current.on("new-mobile-letter-orientation", handleNewOrientation);
    });
  };

  return socket;
}
