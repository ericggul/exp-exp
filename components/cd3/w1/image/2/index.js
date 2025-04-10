import React from "react";
import * as S from "./styles";

const images = ["/assets/cd3/w1/images/1.png", "/assets/cd3/w1/images/2.png", "/assets/cd3/w1/images/3.png", "/assets/cd3/w1/images/4.png"];

export default function ImageDisplay() {
  return (
    <S.ImageContainer>
      {images.map((src, index) => (
        <S.GridItem key={index}>
          <S.StyledImage src={src} alt={`Sample Image ${index + 1}`} />
        </S.GridItem>
      ))}
    </S.ImageContainer>
  );
}
