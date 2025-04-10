import React, { useEffect, useRef, useMemo, useState } from "react";
import * as S from "./styles";
import useResize from "@/utils/hooks/useResize";
import { v4 as uuidv4 } from "uuid";
import useSocket from "utils/hooks/socket/id430/mobile-scroll/useSocketMobile";

const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function Component() {
  const socket = useSocket();
  const mobileId = useMemo(() => uuidv4(), []);

  const [colorHue, setColorHue] = useState(null);

  useEffect(() => {
    setColorHue(getRandom(0, 360));
  }, []);

  const [scrollPos, setScrollPos] = useState(0);
  const scrollContainer = useRef(null);

  const [_, windowHeight] = useResize();
  const windowHeightRef = useRef(windowHeight);
  useEffect(() => {
    windowHeightRef.current = windowHeight;
  }, [windowHeight]);

  useEffect(() => {
    if (!scrollContainer.current) return;

    const handleScroll = (e) => {
      let currScrollPos = window.scrollY;
      const scrollHeight = scrollContainer.current.scrollHeight;
      const relativeScrollTop = currScrollPos / (scrollHeight - windowHeightRef.current);

      setScrollPos(relativeScrollTop);
      if (socket && socket.current) {
        socket.current.emit("mobile-scroll-new-scroll", { scrollPos: relativeScrollTop, mobileId, colorHue });
      }
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [socket, mobileId, colorHue]);

  if (colorHue === null) {
    return null; // Render nothing or a loading indicator until colorHue is set
  }

  return (
    <S.Container>
      <S.ScrollContainer colorHue={colorHue} ref={scrollContainer} />
      <S.Static>{"Scroll"}</S.Static>
    </S.Container>
  );
}
