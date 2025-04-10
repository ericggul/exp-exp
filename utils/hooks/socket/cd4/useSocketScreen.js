import io from "socket.io-client";

import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewText, handleNewColor, handleNewData }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
    return () => {
      if (socket.current) {
        socket.current.off("connect");
      }
    };
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      socket.current.emit("w10-screen-init");
    });

    socket.current.on("new-w10-text", handleNewText);
    socket.current.on("new-w10-color", handleNewColor);
    socket.current.on("new-w10-data", handleNewData);
  };

  return socket;
}
