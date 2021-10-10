import React, { useEffect, useRef } from "react";
import {
  createBoardFromPaths,
  findLowestAndHighestvalueOnBoard,
} from "./helpers";
import { BoardProps } from "./StringBoard";

export function CanvasBoard({ height, width, paths }: BoardProps) {
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (height > 0 && width > 0) {
      const savedRef = canvasRef.current;
      const context = savedRef?.getContext("2d");

      if (savedRef && context) {
        const tempBoard = createBoardFromPaths(height, width, paths);

        const rowLines = height - 1;
        const rowHeight = CANVAS_HEIGHT / height;
        const columnLines = width - 1;
        const columnWidth = CANVAS_WIDTH / width;

        context.fillStyle = "rgb(256,256,256)";
        context.fillRect(0, 0, savedRef.width, savedRef.height);
        context.beginPath();

        /* // Create rowlines
        for(let i = 1; i <= rowLines; i++) {
          context.moveTo(0, rowHeight * i)
          context.lineTo(CANVAS_WIDTH, rowHeight * i)
          context.stroke()
        }
        // Create columnlines
        for(let i = 1; i <= columnLines; i++) {
          context.moveTo(columnWidth * i, 0)
          context.lineTo(columnWidth * i, CANVAS_HEIGHT)
          context.stroke()
        } */

        /* for(let i = 0; i < pathLength; i++) {
          context.fillStyle = "rgb(0,0,0)"
          paths.forEach(path => {
            const currentStep = convertStepOriginFromBottomLeftToTopLeft(path[i], height, width)

            context.fillRect(currentStep.x * columnWidth, currentStep.y * rowHeight, columnWidth, rowHeight)
          })
        } */
        const { lowestValue, highestValue } =
          findLowestAndHighestvalueOnBoard(tempBoard);
        const lightnessStep = (80 - 20) / highestValue;

        console.log("lowestValue", lowestValue);
        console.log("highestValue", highestValue);

        for (let y = 0; y < tempBoard.length; y++) {
          for (let x = 0; x < tempBoard[y].length; x++) {
            if (tempBoard[y][x] !== 0) {
              const lightnessValue = 80 - lightnessStep * tempBoard[y][x];
              context.fillStyle = `hsl(149, 53%, ${lightnessValue}%)`;
              context.fillRect(
                x * columnWidth,
                y * rowHeight,
                columnWidth,
                rowHeight
              );
            }
            if (tempBoard[y][x] === 15) {
              context.fillStyle = `hsl(149, 53%, 80%)`;
              context.fillRect(
                x * columnWidth,
                y * rowHeight,
                columnWidth,
                rowHeight
              );
            }
            if (tempBoard[y][x] === 16) {
              context.fillStyle = `hsl(149, 53%, 10%)`;
              context.fillRect(
                x * columnWidth,
                y * rowHeight,
                columnWidth,
                rowHeight
              );
            }
          }
        }

        /* context.moveTo(0,0)
        context.lineTo(CANVAS_WIDTH,CANVAS_HEIGHT)
        context.stroke() */
      }
    }
  }, [height, width, paths]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ border: "1px solid black" }}
    ></canvas>
  );
}
