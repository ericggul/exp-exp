import React, { useState, useEffect } from "react";
import * as S from "./styles";
import Papa from "papaparse";

export default function DataVisual() {
  const [stockPrice, setStockPrice] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load and parse the CSV file
    fetch("/assets/cd3/basic/data/NFLX.csv")
      .then((response) => response.text())
      .then((csvString) => {
        const result = Papa.parse(csvString, { header: true });
        const prices = result.data
          .filter((row) => row.Date) // Filter out empty rows
          .map((row) => parseFloat(row["Close"])); // Extract closing prices
        setStockData(prices);
      });
  }, []);

  useEffect(() => {
    if (stockData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= stockData.length - 1) {
          clearInterval(interval);
          return prevIndex;
        }
        setStockPrice(stockData[prevIndex + 1]);
        return prevIndex + 1;
      });
    }, 5); // 0.1s interval

    return () => clearInterval(interval);
  }, [stockData]);

  // Determine color based on price change
  const getColor = () => {
    if (currentIndex === 0) return "black";
    const previousPrice = stockData[currentIndex - 1];
    return stockPrice > previousPrice ? "green" : "red";
  };

  return (
    <S.Container>
      <S.Counter color={getColor()}>{stockPrice.toFixed(2)}</S.Counter>
    </S.Container>
  );
}
