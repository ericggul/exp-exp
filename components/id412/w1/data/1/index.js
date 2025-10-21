import React, { useState, useEffect } from "react";
import * as S from "./styles";
import Papa from "papaparse";

export default function DataVisual() {
  const [stockPrice, setStockPrice] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Added this to track previous prices for visual transition
  const [prevPrice, setPrevPrice] = useState(0);

  useEffect(() => {
    // Load and parse the CSV file
    fetch("/assets/cd3/basic/data/NFLX.csv")
      .then((response) => response.text())
      .then((csvString) => {
        // Add comment explaining what Papa.parse does for beginners
        // Papa Parse converts CSV string into JavaScript objects
        const result = Papa.parse(csvString, { header: true });
        const prices = result.data
          .filter((row) => row.Date) // Filter out empty rows
          .map((row) => parseFloat(row["Close"])); // Extract closing prices
        setStockData(prices);
      });
  }, []);

  useEffect(() => {
    if (stockData.length === 0) return;

    // Add comment explaining this effect for beginners
    // This effect creates an animation by updating the price every few milliseconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= stockData.length - 1) {
          clearInterval(interval);
          return prevIndex;
        }
        // Store current price before updating
        setPrevPrice(stockPrice);
        setStockPrice(stockData[prevIndex + 1]);
        return prevIndex + 1;
      });
    }, 10); // Slowed down slightly to make changes more visible

    return () => clearInterval(interval);
  }, [stockData, stockPrice]);

  // Determine color based on price change
  const getColor = () => {
    if (currentIndex === 0) return "#FFF";
    return stockPrice > prevPrice ? "#4CAF50" : "#F44336";
  };

  // Calculate percent change for display
  const getPercentChange = () => {
    if (currentIndex === 0 || prevPrice === 0) return "+0.00%";
    const change = ((stockPrice - prevPrice) / prevPrice) * 100;
    return `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;
  };

  return (
    <S.Container>
      <S.DataWrapper>
        <S.Label>Netflix Stock Price</S.Label>
        <S.Counter color={getColor()}>${stockPrice.toFixed(2)}</S.Counter>
        <S.PercentChange color={getColor()}>{getPercentChange()}</S.PercentChange>
      </S.DataWrapper>
    </S.Container>
  );
}
