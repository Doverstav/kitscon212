import { Path, Step } from "../pieces/types";

export interface PathEdge {
  start: Step,
  end: Step,
  timesTaken: number
}

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

export function findLowestAndHighestvalueOnBoard(board: number[][]): { lowestValue: number, highestValue: number } {
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

  return { lowestValue, highestValue }
}

export function findAllEdges(paths: Path[]): PathEdge[] {
  const edges: PathEdge[] = []
  paths.forEach(path => {
    path.forEach((step, index, self) => {
      if (self[index + 1] !== undefined) {
        const newEdge: PathEdge = { start: step, end: self[index + 1], timesTaken: 1 }

        let existingEdgeIndex = edges.findIndex(edge =>
          edge.start.x === newEdge.start.x &&
          edge.start.y === newEdge.start.y &&
          edge.end.x === newEdge.end.x &&
          edge.end.y === newEdge.end.y
        )

        if (existingEdgeIndex > -1) {
          // Edge exists, increase count
          const oldEdge = edges[existingEdgeIndex]
          edges[existingEdgeIndex] = { ...oldEdge, timesTaken: oldEdge.timesTaken + 1 }
        } else {
          edges.push(newEdge)
        }
      }
    })
  })

  return edges
}

export function convertPathOriginFromBottomLeftToTopLeft(path: Path, height: number, width: number): Path {
  return path.map(step => convertStepOriginFromBottomLeftToTopLeft(step, height, width))
}

export function convertStepOriginFromBottomLeftToTopLeft(step: Step, height: number, width: number): Step {
  return { x: step.x, y: height - step.y - 1 }
}

export function emptyPaths(paths: Path[]) {
  return paths.every(path => path.length === 0)
}