import { bitPairs } from '../helpers'
import { Path, WalkParams } from '../types'

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
    let newY = path[path.length - 1].y
    let newX = path[path.length - 1].x

    const verticalBit = bitPair.charAt(0)
    const horizontalBit = bitPair.charAt(1)

    if (verticalBit === UP) {
      newY = newY + 1 < boardHeight ? newY + 1 : newY
    } else if (verticalBit === DOWN) {
      newY = newY - 1 >= 0 ? newY - 1 : newY
    }

    if (horizontalBit === LEFT) {
      newX = newX - 1 >= 0 ? newX - 1 : newX
    } else if (horizontalBit === RIGHT) {
      newX = newX + 1 < boardWidth ? newX + 1 : newX
    }

    path.push({ x: newX, y: newY })
  })

  return path
}