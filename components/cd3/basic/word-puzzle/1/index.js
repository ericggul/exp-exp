import { useState, useEffect } from "react";
import * as S from "./styles";

const words = [
  "ALGORITHM",
  "QUANTUM",
  "BLOCKCHAIN",
  "CRYPTOGRAPHY",
  "NEUROSCIENCE",
  "ASTROPHYSICS",
  "NANOTECHNOLOGY",
  "BIOTECHNOLOGY",
  "CYBERSECURITY",
  "ARTIFICIAL",
  "INTELLIGENCE",
  "ROBOTICS",
  "GENOMICS",
  "SUSTAINABILITY",
  "METAMATERIAL",
];
const gridSize = 15; // Increased grid size to accommodate longer words

function generatePuzzle(words) {
  const grid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(""));
  const placedWords = [];

  words.forEach((word) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1], // right, down, diagonal
      [0, -1],
      [-1, 0],
      [-1, -1], // left, up, diagonal up-left
      [1, -1],
      [-1, 1], // diagonal up-right, diagonal down-left
    ];
    let placed = false;

    while (!placed && directions.length > 0) {
      const [dx, dy] = directions.splice(Math.floor(Math.random() * directions.length), 1)[0];
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);

      if (x + dx * (word.length - 1) >= 0 && x + dx * (word.length - 1) < gridSize && y + dy * (word.length - 1) >= 0 && y + dy * (word.length - 1) < gridSize) {
        if (word.split("").every((letter, i) => !grid[y + dy * i][x + dx * i] || grid[y + dy * i][x + dx * i] === letter)) {
          word.split("").forEach((letter, i) => {
            grid[y + dy * i][x + dx * i] = letter;
          });
          placed = true;
          placedWords.push(word);
        }
      }
    }
  });

  // Fill empty cells with random letters
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (!grid[y][x]) {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { grid, placedWords };
}

export default function WordPuzzle() {
  const [puzzle, setPuzzle] = useState({ grid: [], placedWords: [] });
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    newGame();
  }, []);

  function newGame() {
    setPuzzle(generatePuzzle(words));
    setFoundWords([]);
    setSelectedCells([]);
    setMessage("");
  }

  function handleCellClick(x, y) {
    if (selectedCells.length === 0) {
      // First cell selected
      setSelectedCells([{ x, y }]);
    } else {
      const start = selectedCells[0];
      const dx = Math.sign(x - start.x);
      const dy = Math.sign(y - start.y);

      // Check if the new cell is in line with the first cell
      if ((x - start.x) * dy === (y - start.y) * dx && Math.abs(x - start.x) <= Math.abs(dx) * (gridSize - 1) && Math.abs(y - start.y) <= Math.abs(dy) * (gridSize - 1)) {
        // If in line, select all cells between the first and the current
        const newSelection = [];
        let cx = start.x;
        let cy = start.y;
        while (cx !== x || cy !== y) {
          newSelection.push({ x: cx, y: cy });
          cx += dx;
          cy += dy;
        }
        newSelection.push({ x, y });
        setSelectedCells(newSelection);
      } else {
        // If not in line, start a new selection
        setSelectedCells([{ x, y }]);
      }
    }
  }

  function checkSelection() {
    const word = selectedCells.map((cell) => puzzle.grid[cell.y][cell.x]).join("");
    const reversedWord = word.split("").reverse().join("");
    if ((puzzle.placedWords.includes(word) || puzzle.placedWords.includes(reversedWord)) && !foundWords.includes(word) && !foundWords.includes(reversedWord)) {
      setFoundWords([...foundWords, word]);
      setMessage(`You found "${word}"!`);
    } else {
      setMessage("Not a valid word. Try again!");
    }
    setSelectedCells([]);
  }

  return (
    <S.PuzzleContainer>
      <S.Title>Advanced Word Puzzle</S.Title>
      <S.ScoreDisplay>
        Found: {foundWords.length} / {puzzle.placedWords.length}
      </S.ScoreDisplay>
      <S.Grid>
        {puzzle.grid.map((row, y) => (
          <S.Row key={y}>
            {row.map((cell, x) => (
              <S.Cell key={`${x}-${y}`} onClick={() => handleCellClick(x, y)} $selected={selectedCells.some((s) => s.x === x && s.y === y)}>
                {cell}
              </S.Cell>
            ))}
          </S.Row>
        ))}
      </S.Grid>
      <S.ButtonGroup>
        <S.Button onClick={checkSelection} disabled={selectedCells.length === 0}>
          Check Selection
        </S.Button>
        <S.Button onClick={newGame}>New Game</S.Button>
      </S.ButtonGroup>
      {message && <S.Message>{message}</S.Message>}
      <S.WordList>
        {words.map((word) => (
          <S.Word key={word} $found={foundWords.includes(word) || foundWords.includes(word.split("").reverse().join(""))}>
            {word}
          </S.Word>
        ))}
      </S.WordList>
    </S.PuzzleContainer>
  );
}
