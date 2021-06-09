/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import _ from 'lodash'


/*

*/

export class MD5 {

  // s specifies the per-round shift amounts
  readonly shiftAmount: number[] = [
    7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
    5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
    4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
    6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21]

  readonly premadeSineTable: number[] = [
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

  a0 = 0x67452301
  b0 = 0xefcdab89
  c0 = 0x98badcfe
  d0 = 0x10325476

  originalMessage = ""
  message = ""

  constructor() {
    console.log('')
  }

  test() {
    for(let i = 0; i < 64; i++) {
      console.log(this.not32(this.premadeSineTable[i].toString(2)))
    }
  }

  run(message: string): string {
    this.originalMessage = message
    this.message = message

    // Pre-processing: adding a single 1 bit
    this.message = this.message.concat('1')

    while ((this.message.length - 448) % 512 != 0) {
      this.message = this.message.concat('0')
    }

    this.message = this.message.concat(this.lengthIn64BitsBinary(this.message))

    for(let i = 0; i < this.message.length; ) {
      for(let j = 0; j < 32; j++) {
        // let A = this.a0.toString(2)
        // let B = this.b0.toString(2)
        // let C = this.c0.toString(2)
        // let D = this.d0.toString(2)

        for(let k = 0; k < 64; k++) {
          // let F = '00000000000000000000000000000000'
          console.log(this.not32(this.premadeSineTable[k].toString(2)))

          // let g = '00000000000000000000000000000000'

          // if (k <= 15) {
          //   F = this.or32(this.and32(B, C), this.and32(this.not32(B), D))
          //   // g = k
          // }

          // F = this.sum32(F, this.sum32(A, this.sum32(this.premadeSineTable[k].toString(2), '00000000000000000000000000000000')))
          // if (F.search('-') >= 0) {
            // console.log('A ', A)
            // console.log('B ', B)
            // console.log('C ', C)
            // console.log('D ', D)
            // console.log('F ', F)
            // console.log()
          // }
          
          
          // A = D
          // D = C
          // C = B
          // B = F //B := B + leftrotate(F, s[i])
        }

        
      }

      i += 512
    }

    return this.message
  }

  lengthIn64BitsBinary(message: string): string {

    let lengthInBinary = message.length.toString(2)
    lengthInBinary = lengthInBinary.padStart(64, '0')

    const lo = lengthInBinary.slice(32, 64)
    const hi = lengthInBinary.slice(0, 32)

    const lohi = lo.concat(hi)

    return lohi
  }

  sum32(firstOperand: string, secondOperand: string) {
    const a = parseInt(firstOperand, 2)
    const b = parseInt(secondOperand, 2)

    const res = (a + b)
    
    

    let str = res.toString(2)

    if (str.length > 32)
      str = str.substring(str.length - 32)
    else 
      str = str.padStart(32, '0')

    return str
  }

  and32(firstOperand: string, secondOperand: string) {
    const a = parseInt(firstOperand, 2)
    const b = parseInt(secondOperand, 2)

    const res = (a & b)
    

    let str = res.toString(2)

    if (str.length > 32)
      str = str.substring(str.length - 32)
    else 
      str = str.padStart(32, '0')

    return str
  }

  or32(firstOperand: string, secondOperand: string) {
    const a = parseInt(firstOperand, 2)
    const b = parseInt(secondOperand, 2)

    const res = (a | b)
    

    let str = res.toString(2)

    if (str.length > 32)
      str = str.substring(str.length - 32)
    else 
      str = str.padStart(32, '0')

    return str
  }

  xor32(firstOperand: string, secondOperand: string) {
    const a = parseInt(firstOperand, 2)
    const b = parseInt(secondOperand, 2)

    const res = (a ^ b)
    

    let str = res.toString(2)

    if (str.length > 32)
      str = str.substring(str.length - 32)
    else 
      str = str.padStart(32, '0')

    return str
  }

  not32(operand: string) {
    const a = parseInt(operand, 2)

    const res = ~a

    if (res < 0) {
      console.log()
      console.log('a ', a.toString(2))
      console.log('not32 negative: ', res.toString(2))
    }

    let str = res.toString(2)

    if (str.length > 32)
      str = str.substring(str.length - 32)
    else 
      str = str.padStart(32, '0')

    return str
  }
}

/*

A 64-bit representation of b (the length of the message before the
padding bits were added) is appended to the result of the previous
step. In the unlikely event that b is greater than 2^64, then only
the low-order 64 bits of b are used. (These bits are appended as two
32-bit words and appended low-order word first in accordance with the
previous conventions.)

At this point the resulting message (after padding with bits and with
b) has a length that is an exact multiple of 512 bits. Equivalently,
this message has a length that is an exact multiple of 16 (32-bit)
words. Let M[0 ... N-1] denote the words of the resulting message,
where N is a multiple of 16.

*/