import React, { useEffect, useRef } from "react";
import * as S from "./styles";
import useResize from "utils/hooks/useResize";

const KAONASHI_COUNT = 100;
const SPEED = 0.88;

export default function MouseMoveVisual() {
  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useResize();
  const mousePosRef = useRef({ x: 0, y: 0 });
  const kaonashisRef = useRef([]);
  const positionsRef = useRef([]);

  useEffect(() => {
    // Initialize positions at the center of the screen
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    positionsRef.current = Array.from({ length: KAONASHI_COUNT }, () => ({
      x: centerX,
      y: centerY,
    }));

    // Update initial mouse position
    mousePosRef.current = { x: centerX, y: centerY };

    // Set up mousemove event listener
    const handleMouseMove = (e) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    const animate = () => {
      let x = mousePosRef.current.x;
      let y = mousePosRef.current.y;

      positionsRef.current.forEach((position, index) => {
        const nextPosition = positionsRef.current[index + 1] || positionsRef.current[0];

        position.x = x;
        position.y = y;

        x += (nextPosition.x - x) * SPEED;
        y += (nextPosition.y - y) * SPEED;

        const kaonashi = kaonashisRef.current[index];
        if (kaonashi) {
          kaonashi.style.transform = `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <S.Container ref={containerRef}>
      {Array.from({ length: KAONASHI_COUNT }).map((_, index) => (
        <S.KaonashiImage
          key={index}
          ref={(el) => (kaonashisRef.current[index] = el)}
          src="/assets/cd3/basic/mouse-move/1.png"
          alt={`Kaonashi ${index + 1}`}
          style={{
            zIndex: KAONASHI_COUNT - index,
            opacity: 1 - index * 0.07,
          }}
        />
      ))}
    </S.Container>
  );
}
