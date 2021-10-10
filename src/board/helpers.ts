import { convertStepOriginFromBottomLeftToTopLeft } from "../pieces/helpers";
import { Path } from "../pieces/types";

export function createBoardFromPaths(height: number, width: number, paths: Path[]): number[][] {
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

  return tempBoard
}

export function findLowestAndHighestvalueOnBoard(board: number[][]): {lowestValue: number, highestValue: number} {
  let lowestValue: number = -1;
  let highestValue: number = -1;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const currentValue = board[y][x];
      if (
        currentValue !== 0 &&
        currentValue !== 15 &&
        currentValue !== 16
      ) {
        if (lowestValue === -1 || currentValue < lowestValue) {
          lowestValue = currentValue;
        }

        if (highestValue === -1 || currentValue > highestValue) {
          highestValue = currentValue;
        }
      }
    }
  }

  return {lowestValue, highestValue}
}