import io from "socket.io-client";

import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewAction }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      socket.current.emit("simple-screen-init");
      socket.current.on("new-simple-action", handleNewAction);
    });
  };

  return socket;
}
