import "./App.css";
import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function calculateWinner(board) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  for (let [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index) {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  const winner = calculateWinner(board);
  const status = winner 
    ? `🎉 Winner: ${winner}` 
    : `Next Player: ${isXNext ? "X" : "O"}`;

  return (
    <>
      <h2 className="status">{status}</h2>
      <div className="board">
        {[0, 3, 6].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row + col;
              return (
                <Square 
                  key={index} 
                  value={board[index]} 
                  onClick={() => handleClick(index)} 
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
