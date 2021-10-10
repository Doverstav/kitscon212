import { Path, Step } from "./types"
import jsSHA from "jssha";
let md5 = require('blueimp-md5')

export const MD5 = "MD5"
export const SHA256 = "SHA-256"
export const SHA512 = "SHA-512"

export type HashingAlgorithm = typeof MD5 | typeof SHA256 | typeof SHA512

export function bitPairs(input: string): string[] {
  const binaryArray = hexStringToBinary(input)

  let bitPairsInOrderOfProcessing: string[] = []

  for (let i = 0; (i + 1) < binaryArray.length; i = i + 2) {
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

export function bitTriplets(input: string): string[] {
  const binaryArray = hexStringToBinary(input)

  let bitTriplets: string[] = []

  // (i + 2) < binaryArray.length will aggressively discard any incomplete sequence of 4 triplets
  // This could potentially throw away 11 bits, so this should probably check for any complete triplets left
  // and try to extract those.
  for (let i = 0; (i + 2) < binaryArray.length; i = i + 3) {
    // Since we want triplets, the closets number divisible by 3 is 12
    // So we have to take 3 characters at a time
    // Then we follow the same logic as the orignal algorithm
    // So bit triplets are processed "byte"-wise from left to right,
    // and least significant bit first
    const byteAndAHalf = binaryArray[i].concat(binaryArray[i + 1], binaryArray[i + 2])

    const bitTriplet1 = byteAndAHalf.substring(0, 3)
    const bitTriplet2 = byteAndAHalf.substring(3, 6)
    const bitTriplet3 = byteAndAHalf.substring(6, 9)
    const bitTriplet4 = byteAndAHalf.substring(9, 12)

    bitTriplets = [
      ...bitTriplets,
      bitTriplet1,
      bitTriplet2,
      bitTriplet3,
      bitTriplet4,
    ]
  }

  return bitTriplets
}

export function hash(input: string, algorithm: HashingAlgorithm): string {
  let hash = ""
  if (algorithm === MD5) {
    hash = md5(input)
  } else {
    const shaObj = new jsSHA(algorithm, "TEXT", { encoding: "UTF8" })
    shaObj.update(input)
    hash = shaObj.getHash("HEX");
  }

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