import React from "react";
import * as S from "./styles";

const videoId = "1SwA46-lSWk";
const startTime = 59; // Start time in seconds

export default function VideoDisplay() {
  return (
    <S.VideoContainer>
      <S.StyledIframe
        src={`https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&start=${startTime}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </S.VideoContainer>
  );
}
