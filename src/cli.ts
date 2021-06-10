#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MD5 } from "./md5";

import { and32, sum32, or32, xor32, not32 } from "./utils/bitwiseOperations"

/*

3.1 Step 1. Append Padding Bits
  The message is "padded" (extended) so that its length (in bits) is
  congruent to 448, modulo 512. That is, the message is extended so
  that it is just 64 bits shy of being a multiple of 512 bits long.
  Padding is always performed, even if the length of the message is
  already congruent to 448, modulo 512.

  Padding is performed as follows: a single "1" bit is appended to the
  message, and then "0" bits are appended so that the length in bits of
  the padded message becomes congruent to 448, modulo 512. In all, at
  least one bit and at most 512 bits are appended.
*/

// const message = '1110'

// console.log('run: ', new MD5().test())
// console.log('parsed: ', parseInt('1111', 2).toString(2))
// console.log(message.substring(message.length - 4))



// const six =     '0110'
// const four  =   '0100'

// const a = parseInt(six, 2)
// const b = parseInt(four, 2)

// const res = (a | b)
// console.log(res)



// // console.log(new MD5().run(message))

// console.log('sum32: ', sum32('0001', '1111'))
// console.log('and32', and32('1111', '1010'))
// console.log('or32', or32('1111', '1010'))
// console.log('xor32', xor32('1000', '1111'))
// console.log('not32', not32('1000'))


console.log('MD5 HASH: ', new MD5().run('1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001110000000011111111000000001101010111111110000000011010101111111100000000110101000000000111111110000000011010101111111100000000110101011111111000000001101010000000000000000000000001111111111100000000110101011111'))


