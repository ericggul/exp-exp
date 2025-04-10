import io from "socket.io-client";

import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewOrientation }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      socket.current.emit("mobile-rotation-2-screen-init");
      socket.current.on("new-mobile-rotation-2-orientation", handleNewOrientation);
    });
  };

  return socket;
}
