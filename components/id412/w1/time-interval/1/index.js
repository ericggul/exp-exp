import React, { useState, useEffect } from "react";
import * as S from "./styles";

const MAX_COUNT = 100;
const MIN_INTERVAL = 100; // 0.1 second
const MAX_INTERVAL = 1000; // 1 second
const MIN_INCREMENT = 1;
const MAX_INCREMENT = 10;

export default function TimeIntervalVisual() {
  const [count, setCount] = useState(0);
  const [hue, setHue] = useState(0);

  useEffect(() => {
    // Map count (0-100) to hue (0-360)
    setHue((count / MAX_COUNT) * 360);
  }, [count]);

  useEffect(() => {
    const getRandomInterval = () => Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL;
    const getRandomIncrement = () => Math.floor(Math.random() * (MAX_INCREMENT - MIN_INCREMENT + 1)) + MIN_INCREMENT;

    const tick = () => {
      setCount((prevCount) => {
        const newCount = prevCount + getRandomIncrement();
        return newCount >= MAX_COUNT ? 0 : newCount;
      });

      // Set up next interval with a new random duration
      timeoutId = setTimeout(tick, getRandomInterval());
    };

    let timeoutId = setTimeout(tick, getRandomInterval());

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <S.Container $hue={hue}>
      <S.Counter>{count}</S.Counter>
    </S.Container>
  );
}
