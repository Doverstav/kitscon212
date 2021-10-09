import { bitPairs } from "../helpers";
import { Path, Step, WalkParams } from "../types";

const VERTICAL = '0'
const HORIZONTAL = '1'
const NEGATIVE = '0'
const POSITIVE = '1'

export function rookWalk({ boardHeight, boardWidth, input }: WalkParams): Path {
  const startY = Math.floor(boardHeight / 2)
  const startX = Math.floor(boardWidth / 2)

  const bitPairsInOrderOfProcessing = bitPairs(input)
  let path = [{ x: startX, y: startY }]

  bitPairsInOrderOfProcessing.forEach(bitPair => {
    let oldY = path[path.length - 1].y
    let oldX = path[path.length - 1].x

    path.push(rookMove(oldX, oldY, boardHeight, boardWidth, bitPair))
  })

  return path
}

export function rookMove(oldX: number, oldY: number, boardHeight: number, boardWidth: number, bitPair: string): Step {
  const directionBit = bitPair.charAt(0)
  const valueBit = bitPair.charAt(1)
  const movementValue = valueBit === POSITIVE ? 1 : -1

  let newY = oldY
  let newX = oldX

  if (directionBit === VERTICAL) {
    newY = oldY + movementValue < boardHeight && oldY + movementValue >= 0 ? oldY + movementValue : oldY
  }

  if (directionBit === HORIZONTAL) {
    newX = oldX + movementValue < boardWidth && oldX + movementValue >= 0 ? oldX + movementValue : oldX
  }

  return { x: newX, y: newY }
}