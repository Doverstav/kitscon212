import React, { useEffect, useState } from "react";
import { convertStepOriginFromBottomLeftToTopLeft } from "../pieces/helpers";
import { Path } from "../pieces/types";
import { createBoardFromPaths } from "./helpers";

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
      const tempBoard = createBoardFromPaths(height, width, paths)

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
