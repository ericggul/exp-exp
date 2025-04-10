import io from "socket.io-client";

import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewData }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      socket.current.emit("mobile-audio-screen-init");
      socket.current.on("new-mobile-audio-data", handleNewData);
    });
  };

  return socket;
}
