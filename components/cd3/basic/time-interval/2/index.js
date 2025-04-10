import React from "react";
import * as S from "./styles";
import Timer from "./timer";

const GRID_SIZE = 10;
const TOTAL_TIMERS = GRID_SIZE * GRID_SIZE;

export default function TimeIntervalVisual() {
  return (
    <S.Container>
      <S.Grid>
        {Array.from({ length: TOTAL_TIMERS }).map((_, index) => (
          <S.Cell key={index}>
            <Timer />
          </S.Cell>
        ))}
      </S.Grid>
    </S.Container>
  );
}
