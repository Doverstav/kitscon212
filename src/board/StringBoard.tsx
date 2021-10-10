import React, { useEffect, useState } from "react";
import { convertStepOriginFromBottomLeftToTopLeft } from "../pieces/helpers";
import { Path } from "../pieces/types";

export interface BoardProps {
  height: number;
  width: number;
  paths: Path[];
}

const boardCharacters = [
  " ",
  ".",
  "o",
  "+",
  "=",
  "*",
  "B",
  "0",
  "X",
  "@",
  "%",
  "&",
  "#",
  "/",
  "^",
  "S",
  "E",
];

export const StringBoard: React.FC<BoardProps> = ({ height, width, paths }) => {
  const [boardState, setBoardState] = useState("");

  useEffect(() => {
    if (height > 0 && width > 0) {
      const tempBoard: number[][] = Array(height)
        .fill(null)
        .map(() => Array(width).fill(0));
      const pathLength = paths[0].length;

      for (let i = 0; i < pathLength; i++) {
        paths.forEach((path) => {
          const currentStep = convertStepOriginFromBottomLeftToTopLeft(
            path[i],
            height,
            width
          );
          if (i === 0) {
            tempBoard[currentStep.y][currentStep.x] = 15;
          }
          if (i === pathLength - 1) {
            tempBoard[currentStep.y][currentStep.x] = 16;
          }

          tempBoard[currentStep.y][currentStep.x] =
            tempBoard[currentStep.y][currentStep.x] < 15 // Do not overwrite special start/end characters
              ? tempBoard[currentStep.y][currentStep.x] + 1
              : tempBoard[currentStep.y][currentStep.x];
        });
      }

      const paddingRow = ["+", ...Array(width).fill("-"), "+\n"].join("");
      const content = tempBoard
        .map((row) => ["|", ...row.map((cell) => boardCharacters[cell]), "|\n"])
        .flat()
        .join("");

      setBoardState(paddingRow.concat(content, paddingRow));
    }
  }, [paths, height, width]);

  return (
    <div style={{ fontSize: "20px" }}>
      <pre>{boardState}</pre>
    </div>
  );
};
