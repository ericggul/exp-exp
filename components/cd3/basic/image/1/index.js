import React from "react";
import * as S from "./styles";

export default function ImageDisplay() {
  return (
    <S.ImageContainer>
      <S.StyledImage src={"/assets/cd3/basic/images/1.png"} alt="Sample Image" />
    </S.ImageContainer>
  );
}
