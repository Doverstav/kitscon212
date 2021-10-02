import React, { useEffect, useState } from 'react'
import { convertStepOriginFromBottomLeftToTopLeft } from '../pieces/helpers'
import { Path } from '../pieces/types'

interface BoardProps {
  height: number;
  width: number;
  paths: Path[];
}

const boardCharacters = [' ', '.', 'o', '+', '=', '*', 'B', '0', 'X', '@', '%', '&', '#', '/', '^', 'S', 'E']

export const StringBoard: React.FC<BoardProps> = ({ height, width, paths }) => {

  const [boardState, setBoardState] = useState("")

  useEffect(() => {
    const tempBoard: number[][] = Array(height).fill(null).map(() => Array(width).fill(0));
    const pathLength = paths[0].length

    for (let i = 0; i < pathLength; i++) {
      paths.forEach(path => {
        const currentStep = convertStepOriginFromBottomLeftToTopLeft(path[i], height, width)
        if (i === 0) {
          tempBoard[currentStep.y][currentStep.x] = 15
        }
        if (i === pathLength - 1) {
          tempBoard[currentStep.y][currentStep.x] = 16
        }

        tempBoard[currentStep.y][currentStep.x] =
          tempBoard[currentStep.y][currentStep.x] < 15
            ? tempBoard[currentStep.y][currentStep.x] + 1
            : tempBoard[currentStep.y][currentStep.x]
      })
    }

    setBoardState(tempBoard.map(row => [...row.map(cell => boardCharacters[cell]), '\n']).flat().join(""))
  }, [paths, height, width])

  return (
    <div>
      I am a board that's {width}&times;{height}!
      <pre>{boardState}</pre>
    </div>
  )
}