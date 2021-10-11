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

  const saveAsImage = () => {
    if (canvasRef && canvasRef.current) {
      const image = canvasRef.current.toDataURL("image/png");
      window.open(image, "_blank");
    }
  };

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

        clearCanvas(context);
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

        const { highestValue } = findLowestAndHighestvalueOnBoard(tempBoard);
        const hue = Math.random() * 360;
        const lightnessStep = (80 - 20) / highestValue;

        const squareSide =
          height > width ? CANVAS_HEIGHT / height : CANVAS_WIDTH / width;
        const widthOffset = (CANVAS_WIDTH - squareSide * width) / 2;
        const heightOffset = (CANVAS_HEIGHT - squareSide * height) / 2;

        paintBorders(context, heightOffset, widthOffset);

        for (let y = 0; y < tempBoard.length; y++) {
          for (let x = 0; x < tempBoard[y].length; x++) {
            if (tempBoard[y][x] !== 0) {
              const lightnessValue = 80 - lightnessStep * tempBoard[y][x];
              //context.fillStyle = `hsl(149, 50%, ${lightnessValue}%)`;
              context.fillStyle = `hsl(${hue}, 50%, ${lightnessValue}%)`;
              context.fillRect(
                widthOffset + x * squareSide,
                heightOffset + y * squareSide,
                squareSide,
                squareSide
              );
            }
            if (tempBoard[y][x] === 15) {
              context.fillStyle = `hsl(${hue}, 50%, 80%)`;
              context.fillRect(
                widthOffset + x * squareSide,
                heightOffset + y * squareSide,
                squareSide,
                squareSide
              );
            }
            if (tempBoard[y][x] === 16) {
              context.fillStyle = `hsl(${hue}, 50%, 10%)`;
              context.fillRect(
                widthOffset + x * squareSide,
                heightOffset + y * squareSide,
                squareSide,
                squareSide
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

  const paintBorders = (
    context: CanvasRenderingContext2D,
    heightOffset: number,
    widthOffset: number
  ) => {
    // Paint border to show what's not part of the "art"
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, CANVAS_WIDTH, heightOffset);
    context.fillRect(
      0,
      CANVAS_HEIGHT - heightOffset,
      CANVAS_WIDTH,
      heightOffset
    );
    context.fillRect(0, 0, widthOffset, CANVAS_HEIGHT);
    context.fillRect(CANVAS_WIDTH - widthOffset, 0, widthOffset, CANVAS_HEIGHT);
  };

  const clearCanvas = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "rgb(256,256,256)";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.beginPath();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: "1px solid black" }}
      ></canvas>
      <div>
        <button onClick={() => saveAsImage()}>Save image</button>
      </div>
    </div>
  );
}
