import { Path, Step } from "./types"

let md5 = require('blueimp-md5')

export function bitPairs(input: string): string[] {
  const hexString = hash(input)
  const binaryArray = hexStringToBinary(hexString)

  let bitPairsInOrderOfProcessing: string[] = []

  for (let i = 0; i < binaryArray.length; i = i + 2) {
    // "Bit pairs are processed bytewise from left to right and least significant bit first"
    // See page 7 here: http://www.dirk-loss.de/sshvis/drunken_bishop.pdf
    const bytePart1 = binaryArray[i]
    const bytePart2 = binaryArray[i + 1]

    const bitPair1 = bytePart1.substring(0, 2)
    const bitPair2 = bytePart1.substring(2, 4)
    const bitPair3 = bytePart2.substring(0, 2)
    const bitPair4 = bytePart2.substring(2, 4)

    bitPairsInOrderOfProcessing = [
      ...bitPairsInOrderOfProcessing,
      bitPair4,
      bitPair3,
      bitPair2,
      bitPair1
    ]
  }

  return bitPairsInOrderOfProcessing
}

function hash(input: string): string {
  const hash = md5(input)

  return hash;
}

function hexStringToBinary(hex: string): string[] {
  return hex.split('').map(hexChar => hex2bin(hexChar))
}

function hex2bin(hex: string): string {
  return (parseInt(hex, 16).toString(2)).padStart(4, '0');
}

export function convertPathOriginFromBottomLeftToTopLeft(path: Path, height: number, width: number): Path {
  return path.map(step => convertStepOriginFromBottomLeftToTopLeft(step, height, width))
}

export function convertStepOriginFromBottomLeftToTopLeft(step: Step, height: number, width: number): Step {
  return { x: step.x, y: height - step.y - 1 }
}