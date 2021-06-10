/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import _, { xor } from 'lodash'
import { and32, sum32, or32, xor32, not32, leftShit32, rightShit32 } from "./utils/bitwiseOperations"

/*

*/

export class MD5 {

  // s specifies the per-round shift amounts
  readonly shiftAmount: number[] = [
    7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
    5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
    4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
    6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21
  ]

  readonly premadeSineTable__K__: number[] = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
    0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
    0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
    0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
    0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
    0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391]

  a0 = 0x67452301.toString(2)
  b0 = 0xefcdab89.toString(2)
  c0 = 0x98badcfe.toString(2)
  d0 = 0x10325476.toString(2)


  originalMessage = ""
  message = ""

  run(message: string): string {
    this.originalMessage = message
    this.message = message

    // Pre-processing: adding a single 1 bit
    this.message = this.message.concat('1')

    while ((this.message.length - 448) % 512 != 0) {
      this.message = this.message.concat('0')
    }

    this.message = this.message.concat(this.lengthIn64BitsBinary(this.message))

    const blocks512: string[] = this.breakMessageInto512bitChunks(this.message)

    for(let i = 0; i < blocks512.length; i++) {
      const M: string[] = this.breakInto16_32BitChunks(blocks512[i])

      for(let j = 0; j < 32; j++) {
        let A = this.a0
        let B = this.b0
        let C = this.c0
        let D = this.d0

        for(let k = 0; k < 64; k++) {
          let F = '00000000000000000000000000000000'
          let g = 0

          if (k <= 15) {
            F = or32(and32(B, C), and32(not32(B), D))   // F := (B and C) or ((not B) and D)
            g = k % 16                                  // g := (i) mod 16
          } else if (16 <= j && j <= 31) {
            F = or32(and32(D, B), and32(not32(D), C))   // F := (D and B) or ((not D) and C)
            g = (5 * j + 1) % 16                        // g := (5×i + 1) mod 16
          } else if (32 <= j && j <= 47) {
            F = xor32(B, xor32(C, D))                   // F := B xor C xor D
            g = (3 * j + 5) % 16                        // g := (3×i + 5) mod 16
          } else if (48 <= j && j <= 63) {
            F = xor32(C, or32(B, not32(D)))             // F := C xor (B or (not D))
            g = (7 * j) % 16                            // g := (7×i) mod 16
          }

          F = sum32(F, sum32(A, sum32(this.premadeSineTable__K__[k].toString(2), M[g])))

          A = D
          D = C
          C = B
          B = sum32(B, this.leftRotate(F, this.shiftAmount[k])) // B := B + leftrotate(F, s[i])
        }

        this.a0 = sum32(this.a0, A)
        this.b0 = sum32(this.b0, B)
        this.c0 = sum32(this.c0, C)
        this.d0 = sum32(this.d0, D)
      }
    }

    return this.a0.concat(this.b0.concat(this.c0.concat(this.d0)))
  }

  lengthIn64BitsBinary(message: string): string {

    let lengthInBinary = message.length.toString(2)
    lengthInBinary = lengthInBinary.padStart(64, '0')

    const lo = lengthInBinary.slice(32, 64)
    const hi = lengthInBinary.slice(0, 32)

    const lohi = lo.concat(hi)

    return lohi
  }

  breakMessageInto512bitChunks(str: string): string[] {
    const message = str
    let returnArray: string[] = []

    for (let i = 0; i < message.length; i += 512) {
      returnArray.push(message.substr(i, 512))
    }

    return returnArray
  }

  breakInto16_32BitChunks(str: string): string[]  {
    const message = str
    let returnArray: string[] = []

    for (let i = 0; i < message.length; i += 32) {
      returnArray.push(message.substr(i, 32))
    }

    return returnArray
  }

  leftRotate(word: string, shiftAmount: number): string {
    return or32(leftShit32(word, shiftAmount), rightShit32(word, 32 - shiftAmount))
  }
}
