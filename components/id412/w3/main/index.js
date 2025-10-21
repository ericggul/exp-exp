import React from "react";
import * as S from "./styles";
import Link from "next/link";

const SINGLE_ARRAY = [
  "face-control",
  "mouse-pos-1",
  "mouse-pos-2",
  "scroller-1",
  "scroller-2",
  "particle-flow",
  "wave-pattern",
  "shader-art",
  "geometric-pattern",
  "fractal-tree",
  "ray-marching",
  "3d-vision-board",
];

const MULTIPLE_ARRAY = ["mobile-scroll", "mobile-rotation-1", "mobile-rotation-2", "mobile-letter", "mobile-audio"];

// Function to convert kebab-case to Title Case
function kebabToTitleCase(item) {
  return item
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Component() {
  return (
    <S.Container>
      <S.Title>Three.js Tutorials</S.Title>

      <S.Comp>
        <S.CategoryTitle>Single Device Examples</S.CategoryTitle>
        <S.List>
          {SINGLE_ARRAY.map((item, index) => (
            <S.Item key={index}>
              <Link href={`/id412/w3/single-device/${item}`} target="_blank" rel="noopener noreferrer">
                {kebabToTitleCase(item)}
              </Link>
            </S.Item>
          ))}
        </S.List>
      </S.Comp>

      <S.Comp>
        <S.CategoryTitle>Multiple Devices Examples</S.CategoryTitle>
        <S.List>
          {MULTIPLE_ARRAY.map((item, index) => (
            <S.Item key={index}>
              <Link href={`/id412/w3/multiple-devices/${item}/screen`} target="_blank" rel="noopener noreferrer">
                {kebabToTitleCase(item)}
              </Link>
            </S.Item>
          ))}
        </S.List>
      </S.Comp>
    </S.Container>
  );
}
