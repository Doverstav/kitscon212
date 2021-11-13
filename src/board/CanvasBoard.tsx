import React, { useEffect, useRef } from "react";
import { Step } from "../pieces/types";
import {
  convertPathOriginFromBottomLeftToTopLeft,
  convertStepOriginFromBottomLeftToTopLeft,
  createBoardFromPaths,
  emptyPaths,
  findAllEdges,
  findLowestAndHighestvalueOnBoard,
  PathEdge,
} from "./helpers";
import { BoardProps } from "./StringBoard";

export const LINES = "Lines";
export const SQUARES = "Squares";
export type VisualisationType = typeof LINES | typeof SQUARES;
export interface CanvasBoardProps extends BoardProps {
  visualisationAlgorithm: VisualisationType;
}

export function CanvasBoard({
  height,
  width,
  paths,
  visualisationAlgorithm,
}: CanvasBoardProps) {
  const BORDER_WIDTH = 5;
  const CANVAS_WIDTH = 500;
  const CANVAS_HEIGHT = 500;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const saveAsImage = () => {
    if (canvasRef && canvasRef.current) {
      const image = canvasRef.current.toDataURL("image/png");
      const newWindow = window.open();
      newWindow?.document.write(`<img src=${image} />`);
    }
  };

  useEffect(() => {
    if (height > 0 && width > 0 && !emptyPaths(paths)) {
      const savedRef = canvasRef.current;
      const context = savedRef?.getContext("2d");

      if (savedRef && context) {
        const squareSide =
          height > width
            ? (CANVAS_HEIGHT - BORDER_WIDTH * 2) / height
            : (CANVAS_WIDTH - BORDER_WIDTH * 2) / width;
        const widthOffset = (CANVAS_WIDTH - squareSide * width) / 2;
        const heightOffset = (CANVAS_HEIGHT - squareSide * height) / 2;

        clearCanvas(context);
        paintBorders(context, heightOffset, widthOffset);

        if (visualisationAlgorithm === SQUARES) {
          const tempBoard = createBoardFromPaths(height, width, paths);
          paintSquares(
            context,
            tempBoard,
            squareSide,
            widthOffset,
            heightOffset
          );
        } else if (visualisationAlgorithm === LINES) {
          const edges = findAllEdges(
            paths.map((path) =>
              convertPathOriginFromBottomLeftToTopLeft(path, height, width)
            )
          );
          const starts = paths.map((path) =>
            convertStepOriginFromBottomLeftToTopLeft(path[0], height, width)
          );
          const ends = paths.map((path) =>
            convertStepOriginFromBottomLeftToTopLeft(
              path[path.length - 1],
              height,
              width
            )
          );

          paintLines(
            context,
            edges,
            starts,
            ends,
            squareSide,
            widthOffset,
            heightOffset
          );
        }
      }
    }
  }, [height, width, paths, visualisationAlgorithm]);

  const clearCanvas = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = "rgba(255,255,255,0)";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.beginPath();
  };

  const paintBorders = (
    context: CanvasRenderingContext2D,
    heightOffset: number,
    widthOffset: number
  ) => {
    // Paint borders
    context.fillStyle = "rgb(0,0,0)";
    if (heightOffset > 0) {
      const borderLength = CANVAS_WIDTH - widthOffset * 2 + BORDER_WIDTH * 2;
      // Top
      context.fillRect(
        widthOffset - BORDER_WIDTH,
        heightOffset - BORDER_WIDTH,
        borderLength,
        BORDER_WIDTH
      );
      // Bottom
      context.fillRect(
        widthOffset - BORDER_WIDTH,
        CANVAS_HEIGHT - heightOffset,
        borderLength,
        BORDER_WIDTH
      );
    }

    if (widthOffset > 0) {
      const borderLength = CANVAS_HEIGHT - heightOffset * 2 + BORDER_WIDTH * 2;
      // Left
      context.fillRect(
        widthOffset - BORDER_WIDTH,
        heightOffset - BORDER_WIDTH,
        BORDER_WIDTH,
        borderLength
      );
      // Right
      context.fillRect(
        CANVAS_WIDTH - widthOffset,
        heightOffset - BORDER_WIDTH,
        BORDER_WIDTH,
        borderLength
      );
    }
  };

  const paintSquares = (
    context: CanvasRenderingContext2D,
    tempBoard: number[][],
    squareSide: number,
    widthOffset: number,
    heightOffset: number
  ) => {
    const { highestValue } = findLowestAndHighestvalueOnBoard(tempBoard);
    const hue = Math.random() * 360;
    const lightnessStep = (80 - 20) / highestValue;

    // Create white background
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(
      widthOffset,
      heightOffset,
      CANVAS_WIDTH - widthOffset * 2,
      CANVAS_HEIGHT - heightOffset * 2
    );

    for (let y = 0; y < tempBoard.length; y++) {
      for (let x = 0; x < tempBoard[y].length; x++) {
        if (tempBoard[y][x] !== 0) {
          const lightnessValue = 80 - lightnessStep * tempBoard[y][x];
          //context.fillStyle = `hsl(149, 50%, ${lightnessValue}%)`;
          context.fillStyle = `hsl(${hue}, 50%, ${lightnessValue}%)`;

          if (tempBoard[y][x] === 15) {
            context.fillStyle = `hsl(${hue}, 50%, 80%)`;
          }

          if (tempBoard[y][x] === 16) {
            context.fillStyle = `hsl(${hue}, 50%, 10%)`;
          }

          context.fillRect(
            widthOffset + x * squareSide,
            heightOffset + y * squareSide,
            squareSide,
            squareSide
          );
        }
      }
    }
  };

  const paintLines = (
    context: CanvasRenderingContext2D,
    edges: PathEdge[],
    starts: Step[],
    ends: Step[],
    squareSide: number,
    widthOffset: number,
    heightOffset: number
  ) => {
    // Create white background
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(
      widthOffset,
      heightOffset,
      CANVAS_WIDTH - widthOffset * 2,
      CANVAS_HEIGHT - heightOffset * 2
    );

    context.fillStyle = "rgb(0,0,0)";

    const distanceFromLeft = (x: number) => x * squareSide + squareSide / 2;
    const distanceFromTop = (y: number) => y * squareSide + squareSide / 2;

    edges.forEach((edge) => {
      const lineStartX = widthOffset + distanceFromLeft(edge.start.x);
      const lineStartY = heightOffset + distanceFromTop(edge.start.y);
      const lineEndX = widthOffset + distanceFromLeft(edge.end.x);
      const lineEndY = heightOffset + distanceFromTop(edge.end.y);

      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(lineStartX, lineStartY);
      context.lineTo(lineEndX, lineEndY);
      context.stroke();
    });

    starts.forEach((start) => {
      const squareCenterX = widthOffset + distanceFromLeft(start.x);
      const squareCenterY = heightOffset + distanceFromTop(start.y);

      context.beginPath();
      context.arc(squareCenterX, squareCenterY, squareSide / 4, 0, 2 * Math.PI);
      context.fill();
    });

    ends.forEach((end) => {
      const squareCenterX = widthOffset + distanceFromLeft(end.x);
      const squareCenterY = heightOffset + distanceFromTop(end.y);

      const side = squareSide / 2;
      context.beginPath();
      context.fillRect(
        squareCenterX - side / 2,
        squareCenterY - side / 2,
        side,
        side
      );
    });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
      <div>
        <button onClick={() => saveAsImage()}>Save image</button>
      </div>
    </div>
  );
}
