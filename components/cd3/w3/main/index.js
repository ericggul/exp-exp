import React, { useEffect, useRef } from "react";
import * as S from "./styles";
import Link from "next/link";

const SINGLE_ARRAY = ["face-control", "mouse-pos-1", "mouse-pos-2", "scroller-1", "scroller-2"];

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
      <S.Comp>
        <h1>Single Device Examples</h1>
        <S.List>
          {SINGLE_ARRAY.map((item, index) => (
            <S.Item key={index}>
              <Link href={`/id430/single-device/${item}`}>{kebabToTitleCase(item)}</Link>
            </S.Item>
          ))}
        </S.List>
      </S.Comp>

      <S.Comp>
        <h1>Multiple Devices Examples</h1>
        <S.List>
          {MULTIPLE_ARRAY.map((item, index) => (
            <S.Item key={index}>
              <Link href={`/id430/multiple-devices/${item}/screen`}>{kebabToTitleCase(item)}</Link>
            </S.Item>
          ))}
        </S.List>
      </S.Comp>
      <div
        style={{
          height: "100px",
        }}
      ></div>
    </S.Container>
  );
}
