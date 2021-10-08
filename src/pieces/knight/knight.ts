import { bitTriplets } from "../helpers";
import { Path, WalkParams } from "../types";

const NORMAL = '0'
const FLIPPED = '1'
const UP = '0'
const DOWN = '1'
const LEFT = '0'
const RIGHT = '1'

export function walk({boardHeight, boardWidth, input}: WalkParams): Path {
  const startY = Math.floor(boardHeight / 2)
  const startX = Math.floor(boardWidth / 2)

  const bitTripletsToProcess = [...bitTriplets(input),]

  let path = [{ x: startX, y: startY }]

  bitTripletsToProcess.forEach(bitTriplet => {
    let newY = path[path.length - 1].y
    let newX = path[path.length - 1].x

    const inversionBit = bitTriplet.charAt(0)
    const verticalBit = bitTriplet.charAt(1)
    const verticalChange = inversionBit === NORMAL ? 2 : 1
    const horizontalBit = bitTriplet.charAt(2)
    const horizontalChange = inversionBit === NORMAL ? 1 : 2

    if (verticalBit === UP) {
      newY = newY + verticalChange < boardHeight ? newY + verticalChange : newY
    } else if (verticalBit === DOWN) {
      newY = newY - verticalChange >= 0 ? newY - verticalChange : newY
    }

    if (horizontalBit === LEFT) {
      newX = newX - horizontalChange >= 0 ? newX - horizontalChange : newX
    } else if (horizontalBit === RIGHT) {
      newX = newX + horizontalChange < boardWidth ? newX + horizontalChange : newX
    }

    path.push({ x: newX, y: newY })
  })
  
  return path
}