import React from "react";

type SquareProps = {
  value: string;
  highlight: Boolean | null;
  onClick: () => void;
};

function Square({ value, highlight, onClick }: SquareProps) {
  const className = "square" + (highlight ? " highlight" : "");

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
