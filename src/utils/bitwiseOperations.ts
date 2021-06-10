export function sum32(firstOperand: string, secondOperand: string): string  {
  const totalLength = 32
  
  const firstOp = firstOperand.padStart(totalLength, '0')
  const secondOp = secondOperand.padStart(totalLength, '0')

  let returnStr = ""
  let carry = false

  for (let i = totalLength - 1; i >= 0; i--) {
    const sum = ((firstOp[i] === '1') !== (secondOp[i] === '1') !== carry)

    returnStr = sum ? '1'.concat(returnStr) : '0'.concat(returnStr)

    carry = 
      ((firstOp[i] === '1') && (secondOp[i] === '1')) ||
      ((secondOp[i] === '1') && carry) ||
      ((firstOp[i] === '1') && carry)


    // if ((firstOp[i] === '1') && (secondOp[i] === '1') && carrier) {
    //   returnStr = '1'.concat(returnStr)
    //   carrier = true
    // }

    // else if ((firstOp[i] === '1') && (secondOp[i] === '1')) {
    //   returnStr = '0'.concat(returnStr)
    //   carrier = true
    // }

    // else if ((firstOp[i] === '1') || (secondOp[i] === '1') && carrier) {
    //   returnStr = '0'.concat(returnStr)
    //   carrier = true
    // }

    // else if ((firstOp[i] === '1') || (secondOp[i] === '1')) {
    //   returnStr = '1'.concat(returnStr)
    //   carrier = false
    // }

    // else if (carrier) {
    //   returnStr = '1'.concat(returnStr)
    //   carrier = false
    // }

    // else {
    //   returnStr = '0'.concat(returnStr)
    //   carrier = false
    // }
  }

  return returnStr
}

export function and32(firstOperand: string, secondOperand: string): string  {
  const totalLength = 32
  
  const firstOp = firstOperand.padStart(totalLength, '0')
  const secondOp = secondOperand.padStart(totalLength, '0')

  let returnStr = ""

  for (let i = totalLength - 1; i >= 0; i--) {
    if ((firstOp[i] === '1') && (secondOp[i] === '1'))
      returnStr = '1'.concat(returnStr)
    else
      returnStr = '0'.concat(returnStr)
  }

  return returnStr
}

export function or32(firstOperand: string, secondOperand: string): string  {
  const totalLength = 32
  
  const firstOp = firstOperand.padStart(totalLength, '0')
  const secondOp = secondOperand.padStart(totalLength, '0')

  let returnStr = ""

  for (let i = totalLength - 1; i >= 0; i--) {
    if ((firstOp[i] === '1') || (secondOp[i] === '1'))
      returnStr = '1'.concat(returnStr)
    else
      returnStr = '0'.concat(returnStr)
  }

  return returnStr
}
  

export function xor32(firstOperand: string, secondOperand: string): string  {
  const totalLength = 32
  
  const firstOp = firstOperand.padStart(totalLength, '0')
  const secondOp = secondOperand.padStart(totalLength, '0')

  let returnStr = ""

  for (let i = totalLength - 1; i >= 0; i--) {
    if ((firstOp[i] === '1') !== (secondOp[i] === '1'))
      returnStr = '1'.concat(returnStr)
    else
      returnStr = '0'.concat(returnStr)
  }

  return returnStr
}


export function not32(operand: string): string  {
  const totalLength = 32
  
  const firstOp = operand.padStart(totalLength, '0')

  let returnStr = ""

  for (let i = totalLength - 1; i >= 0; i--) {
    if ((firstOp[i] === '1'))
      returnStr = '0'.concat(returnStr)
    else
      returnStr = '1'.concat(returnStr)
  }

  return returnStr
}



