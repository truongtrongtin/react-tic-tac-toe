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
      {Array<string>(boardSize)
        .fill("")
        .map((_, i) => {
          return (
            <div className="board-row" key={i}>
              {Array<string>(boardSize)
                .fill("")
                .map((_, j) => {
                  const index = boardSize * i + j;
                  return (
                    <Square
                      key={j}
                      value={squares[index]}
                      onClick={() => onClick(index)}
                      highlight={winLine ? winLine.includes(index) : false}
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
