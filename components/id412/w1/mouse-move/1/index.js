import React, { useMemo, useRef, useEffect } from "react";
import * as S from "./styles";
import useMousePos from "utils/hooks/useMousePos";

const GRID_SIZE = 10; // Adjust as needed for performance

export default function MouseMoveVisual() {
  const mousePos = useMousePos();
  const circlesRef = useRef([]);

  const grid = useMemo(() => {
    return [...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => {
      const rowIndex = Math.floor(index / GRID_SIZE);
      const colIndex = index % GRID_SIZE;
      return {
        x: (colIndex + 0.5) / GRID_SIZE,
        y: (rowIndex + 0.5) / GRID_SIZE,
      };
    });
  }, []);

  useEffect(() => {
    let animationFrameId;

    const updateCircles = () => {
      circlesRef.current.forEach(({ element, x, y }) => {
        const dx = x - mousePos.x;
        const dy = y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Invert the scale calculation: larger when far, smaller when close
        const scale = Math.min(2, 0.2 + distance * 2); // Added min limit to prevent too large scaling

        element.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });

      animationFrameId = requestAnimationFrame(updateCircles);
    };

    updateCircles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <S.Container>
      {grid.map(({ x, y }, index) => (
        <S.Circle
          key={index}
          style={{
            left: `${x * 100}%`,
            top: `${y * 100}%`,
          }}
          ref={(el) => {
            circlesRef.current[index] = { element: el, x, y };
          }}
        />
      ))}
    </S.Container>
  );
}
