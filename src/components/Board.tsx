import React from "react";
import Square from "./Square";

type BoardProps = {
  squares: string[];
  winLine: number[] | null;
  onClick: (index: number) => void;
};

function Board({ squares, winLine, onClick }: BoardProps) {
  const boardSize = 3;

  return (
    <div>
      {[...Array(boardSize)].map((_, i) => {
        return (
          <div className="board-row" key={i}>
            {[...Array(boardSize)].map((_, j) => {
              const index = boardSize * i + j;
              return (
                <Square
                  key={j}
                  value={squares[index]}
                  onClick={() => onClick(index)}
                  highlight={winLine && winLine.includes(index)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
