import { bitPairs } from "../helpers";
import { Path, WalkParams } from "../types";

const VERTICAL = '0'
const HORIZONTAL = '1'
const NEGATIVE = '0'
const POSITIVE = '1'

export function walk({boardHeight, boardWidth, input}: WalkParams): Path {
  const startY = Math.floor(boardHeight / 2)
  const startX = Math.floor(boardWidth / 2)

  const bitPairsInOrderOfProcessing = bitPairs(input)
  let path = [{ x: startX, y: startY }]

  bitPairsInOrderOfProcessing.forEach(bitPair => {
    let newY = path[path.length - 1].y
    let newX = path[path.length - 1].x

    const directionBit = bitPair.charAt(0)
    const valueBit = bitPair.charAt(1)
    const movementValue = valueBit === POSITIVE ? 1 : -1

    if(directionBit === VERTICAL) {
      newY = newY + movementValue < boardHeight && newY + movementValue >= 0 ? newY + movementValue : newY
    }

    if(directionBit === HORIZONTAL) {
      newX = newX + movementValue < boardWidth && newX + movementValue >= 0 ? newX + movementValue : newX
    }

    path.push({ x: newX, y: newY })
  })

  return path
}