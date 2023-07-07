import { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([
    { squares: Array<string>(9).fill(""), latestMoveSquare: 0 },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  function handleClick(i: number) {
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory(hist.concat([{ squares, latestMoveSquare: i }]));
    setStepNumber(hist.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const winInfo = calculateWinner(current.squares);
  const winner = winInfo.winner;
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (winInfo.isDraw) {
      status = "Draw";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  const moves = history.map((step, move) => {
    const latestMoveSquare = step.latestMoveSquare;
    const col = 1 + (latestMoveSquare % 3);
    const row = 1 + Math.floor(latestMoveSquare / 3);
    const desc = move
      ? `Go to move #${move} (${col}, ${row})`
      : "Go to game start";
    return (
      <li key={move}>
        <button
          className={move === stepNumber ? "move-list-item-selected" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
          winLine={winInfo.line}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? "descending" : "ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
        isDraw: false,
      };
    }
  }

  let isDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      isDraw = false;
      break;
    }
  }
  return { winner: null, line: null, isDraw };
}

export default Game;
