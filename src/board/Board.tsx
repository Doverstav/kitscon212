import React, { useEffect, useState } from 'react'
import { convertStepOriginFromBottomLeftToTopLeft } from '../pieces/helpers'
import { Path } from '../pieces/types'

interface BoardProps {
  height: number;
  width: number;
  paths: Path[];
}

const startCharacter = 'S'
const endCharacter = 'E'
const boardCharacters = [' ', '.', 'o', '+', '=', '*', 'B', '0', 'X', '@', '%', '&', '#', '/', '^', 'S', 'E']

export const Board: React.FC<BoardProps> = ({ height, width, paths }) => {

  const [boardState, setBoardState] = useState<number[][]>([[]])

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

    console.log(tempBoard.map(row => [...row.map(cell => cell), '\n']).flat().reverse().join(""))

    console.log(tempBoard.map(row => [...row.map(cell => boardCharacters[cell]), '\n']).flat().join(""))
    setBoardState(tempBoard)
  }, [paths])

  return (
    <div>
      I am a board that's {width}&times;{height}!
      {boardState.map(row =>
        <div>
          {row.map(cell =>
            <span style={{ fontFamily: 'monospace' }}>{boardCharacters[cell]}</span>
          )}
        </div>
      )}
    </div>
  )
}