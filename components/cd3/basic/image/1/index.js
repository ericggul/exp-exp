import React, { useState } from "react";
import * as S from "./styles";

export default function ImageDisplay() {
  // Add interactive element with hover states to demonstrate to designers
  const [hoverEffect, setHoverEffect] = useState("none");

  // Array of different effects designers might use
  const effects = [
    { name: "Original", value: "none" },
    { name: "Grayscale", value: "grayscale" },
    { name: "Blur", value: "blur" },
    { name: "Sepia", value: "sepia" },
    { name: "Saturate", value: "saturate" },
  ];

  return (
    <S.Container>
      <S.Title>Image Filter Effects</S.Title>

      <S.ImageContainer>
        <S.StyledImage src={"/assets/cd3/basic/images/1.png"} alt="Sample Image" effect={hoverEffect} />
      </S.ImageContainer>

      <S.ControlsContainer>
        <S.Description>
          Click to apply different CSS filters to the image.
          <br />
          These effects demonstrate how to use <code>filter</code> property in CSS.
        </S.Description>

        <S.ButtonGroup>
          {effects.map((effect) => (
            <S.EffectButton key={effect.value} active={hoverEffect === effect.value} onClick={() => setHoverEffect(effect.value)}>
              {effect.name}
            </S.EffectButton>
          ))}
        </S.ButtonGroup>
      </S.ControlsContainer>
    </S.Container>
  );
}
