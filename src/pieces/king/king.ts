import { bishopMove } from "../bishop/bishop";
import { bitTriplets } from "../helpers";
import { rookMove } from "../rook/rook";
import { Path, WalkParams } from "../types";

const ROOK = '0'
const BISHOP = '1'

export function kingWalk({ boardHeight, boardWidth, input }: WalkParams): Path {
  const startY = Math.floor(boardHeight / 2)
  const startX = Math.floor(boardWidth / 2)

  const bitTripletsInOrderOfProcessing = bitTriplets(input)
  let path = [{ x: startX, y: startY }]

  bitTripletsInOrderOfProcessing.forEach(bitTriplet => {
    let oldY = path[path.length - 1].y
    let oldX = path[path.length - 1].x

    const moveLike = bitTriplet.charAt(0)
    const bitPair = bitTriplet.substring(1, 3)

    if (moveLike === ROOK) {
      path.push(rookMove(oldX, oldY, boardHeight, boardWidth, bitPair))
    } else if (moveLike === BISHOP) {
      path.push(bishopMove(oldX, oldY, boardHeight, boardWidth, bitPair))
    }
  })

  return path
}