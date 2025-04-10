import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const MIN_INTERVAL = 1; // 0.001 second (100x faster than 0.1)
const MAX_INTERVAL = 20; // 0.02 second (100x faster than 2)

const pulse = keyframes`
  0% {
    opacity: 1;
    text-shadow: 0 0 10px #3333ff, 0 0 20px #0000ff, 0 0 30px #0000cc, 0 0 40px #000080;
  }
  50% {
    opacity: 0.8;
    text-shadow: 0 0 5px #3333ff, 0 0 10px #0000ff, 0 0 15px #0000cc, 0 0 20px #000080;
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 10px #3333ff, 0 0 20px #0000ff, 0 0 30px #0000cc, 0 0 40px #000080;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(51, 51, 255, 0.3), inset 0 0 5px rgba(51, 51, 255, 0.1);
  width: 100%;
  height: 100%;
`;

const Counter = styled.div`
  font-size: 4vmin;
  color: #3333ff;
  font-weight: bold;
  animation: ${pulse} 2s infinite ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function Timer() {
  const [count, setCount] = useState(null);
  const [interval] = useState(() => Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL);

  const incrementCount = useCallback(() => {
    setCount((prevCount) => {
      if (prevCount === null) {
        return Math.floor(Math.random() * 10000); // Start with 0-9999
      }
      return (prevCount + 1) % 10000; // Cycle 0-9999
    });
  }, []);

  useEffect(() => {
    const timerId = setInterval(incrementCount, interval);
    return () => clearInterval(timerId);
  }, [interval, incrementCount]);

  if (count === null) return <TimerContainer />; // Render an empty container until we have a count

  return <TimerContainer>{count !== 0 && <Counter>{count}</Counter>}</TimerContainer>;
}
