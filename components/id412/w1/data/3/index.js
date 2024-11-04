import React, { useState, useEffect } from "react";
import * as S from "./styles";
import Papa from "papaparse";

export default function DataVisual() {
  const [stockPrice, setStockPrice] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Load and parse the CSV file
    fetch("/assets/id412/w1/data/NFLX.csv")
      .then((response) => response.text())
      .then((csvString) => {
        const result = Papa.parse(csvString, { header: true });
        const data = result.data
          .filter((row) => row.Date) // Filter out empty rows
          .map((row) => ({
            date: row.Date,
            price: parseFloat(row["Close"]),
          }));
        setStockData(data);
      });
  }, []);

  useEffect(() => {
    if (stockData.length === 0 || !isRunning) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= stockData.length - 1) {
          setIsRunning(false);
          clearInterval(interval);
          return prevIndex;
        }
        const nextData = stockData[prevIndex + 1];
        setStockPrice(nextData.price);
        setCurrentDate(nextData.date);
        return prevIndex + 1;
      });
    }, 5);

    return () => clearInterval(interval);
  }, [stockData, isRunning]);

  const handleStart = () => {
    if (stockData.length > 0) {
      setIsRunning(true);
      setStockPrice(stockData[0].price);
      setCurrentDate(stockData[0].date);
      setCurrentIndex(0);
    }
  };

  const calculateCircleSize = (price) => {
    return `${Math.sqrt(price) * 5}vmin`;
    // return `${price * 5}vmin`;
  };

  return (
    <S.Container>
      <S.Circle
        style={{
          width: calculateCircleSize(stockPrice),
          height: calculateCircleSize(stockPrice),
        }}
      >
        <S.Counter>{"$" + stockPrice.toFixed(2)}</S.Counter>
      </S.Circle>
      <S.DateDisplay>{currentDate}</S.DateDisplay>
      {!isRunning && <S.StartButton onClick={handleStart}>Start</S.StartButton>}
    </S.Container>
  );
}
