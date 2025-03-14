import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], // Horizontal rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal lines
    [2, 4, 6],
  ];
  
  // Check each line for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winning symbol ('X' or 'O')
    }
  }
  return null; // No winner
}

export default function Board() {
  const [isXTurn, setIsXTurn] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (board[i] || calculateWinner(board)) return; // If the square is already filled or there's a winner
    const nextBoard = board.slice(); // Make a copy of the board
    nextBoard[i] = isXTurn ? "X" : "O"; // Set the clicked square
    setBoard(nextBoard);
    setIsXTurn(!isXTurn); // Switch turn
  }

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXTurn ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={board[0]} onSquareClick={() => handleClick(0)} />
        <Square value={board[1]} onSquareClick={() => handleClick(1)} />
        <Square value={board[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={board[3]} onSquareClick={() => handleClick(3)} />
        <Square value={board[4]} onSquareClick={() => handleClick(4)} />
        <Square value={board[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} onSquareClick={() => handleClick(6)} />
        <Square value={board[7]} onSquareClick={() => handleClick(7)} />
        <Square value={board[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
