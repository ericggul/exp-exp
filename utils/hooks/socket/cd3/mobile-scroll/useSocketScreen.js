import io from "socket.io-client";

import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewScroll }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      socket.current.emit("mobile-scroll-screen-init");
      socket.current.on("new-mobile-scroll-scroll", handleNewScroll);
    });
  };

  return socket;
}
