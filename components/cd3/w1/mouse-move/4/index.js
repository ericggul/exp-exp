import React, { useEffect, useRef } from "react";
import * as S from "./styles";
import useMousePos from "utils/hooks/useMousePos";

export default function MouseMoveVisual() {
  const mousePos = useMousePos();
  const containerRef = useRef(null);
  const shapeRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !shapeRef.current) return;

    const updateVisual = () => {
      const { x, y } = mousePos;
      const hue1 = (x * 60 + 180).toFixed(0); // Subtle blue to purple range
      const hue2 = (y * 60 + 200).toFixed(0); // Subtle purple to pink range
      const gradientX = (x * 100).toFixed(2);
      const gradientY = (y * 100).toFixed(2);

      containerRef.current.style.setProperty("--hue1", hue1);
      containerRef.current.style.setProperty("--hue2", hue2);
      containerRef.current.style.setProperty("--gradient-x", `${gradientX}%`);
      containerRef.current.style.setProperty("--gradient-y", `${gradientY}%`);

      // Update AbstractShape
      const translateX = (x - 0.5) * 20; // Move -10% to +10% horizontally
      const translateY = (y - 0.5) * 20; // Move -10% to +10% vertically
      const scale = 1 + (x + y) * 0.2; // Scale between 1 and 1.4
      const rotate = (x - 0.5) * 45; // Rotate -22.5 to +22.5 degrees

      shapeRef.current.style.setProperty("--translate-x", `${translateX}%`);
      shapeRef.current.style.setProperty("--translate-y", `${translateY}%`);
      shapeRef.current.style.setProperty("--scale", scale);
      shapeRef.current.style.setProperty("--rotate", `${rotate}deg`);
    };

    updateVisual();
  }, [mousePos]);

  return (
    <S.Container ref={containerRef}>
      <S.AbstractShape ref={shapeRef} />
    </S.Container>
  );
}
