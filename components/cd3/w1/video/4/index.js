import React, { useState } from "react";
import * as S from "./styles";

const videoId = "1SwA46-lSWk";
const startTime = 59; // Start time in seconds
const N = 4; // Grid size

export default function VideoDisplay() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <S.Container>
      <S.VideoGrid>
        {[...Array(N * N)].map((_, index) => (
          <S.VideoContainer key={index} $index={index}>
            <S.StyledIframe
              src={`https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&start=${startTime}${isPlaying ? "&autoplay=1" : ""}`}
              title={`YouTube video player ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </S.VideoContainer>
        ))}
      </S.VideoGrid>
      {!isPlaying && <S.PlayButton onClick={handlePlay}>Play All Videos</S.PlayButton>}
    </S.Container>
  );
}
