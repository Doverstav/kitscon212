import { bitPairs } from '../helpers'
import { Path, Step, WalkParams } from '../types'

const UP = '0'
const DOWN = '1'
const LEFT = '0'
const RIGHT = '1'

export function walk({ boardHeight, boardWidth, input }: WalkParams): Path {
  console.log('walking')

  const startY = Math.floor(boardHeight / 2)
  const startX = Math.floor(boardWidth / 2)

  const bitPairsInOrderOfProcessing = bitPairs(input)
  let path = [{ x: startX, y: startY }]

  console.log(bitPairsInOrderOfProcessing)

  bitPairsInOrderOfProcessing.forEach(bitPair => {
    let oldY = path[path.length - 1].y
    let oldX = path[path.length - 1].x

    path.push(move(oldX, oldY, boardHeight, boardWidth, bitPair))
  })

  return path
}

export function move(oldX: number, oldY: number, boardHeight: number, boardWidth: number, bitPair: string): Step {
  const verticalBit = bitPair.charAt(0)
  const horizontalBit = bitPair.charAt(1)

  let newY = oldY
  let newX = oldX

  if (verticalBit === UP) {
    newY = oldY + 1 < boardHeight ? oldY + 1 : oldY
  } else if (verticalBit === DOWN) {
    newY = oldY - 1 >= 0 ? oldY - 1 : oldY
  }

  if (horizontalBit === LEFT) {
    newX = oldX - 1 >= 0 ? oldX - 1 : oldX
  } else if (horizontalBit === RIGHT) {
    newX = oldX + 1 < boardWidth ? oldX + 1 : oldX
  }

  return {x: newX, y: newY}
}