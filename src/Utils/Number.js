const arrayNumber = [
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
]

const redDozens = (number, full) => {
  let stringNumber = ''
  const dozen = Math.floor(number / 10)
  const unit = number % 10
  if (dozen > 1) {
    stringNumber = ` ${arrayNumber[dozen]} mươi`
    if (unit === 1) {
      stringNumber += ' mốt'
    }
  } else if (dozen === 1) {
    stringNumber = ' mười'
    if (unit === 1) {
      stringNumber += ' một'
    }
  } else if (full && unit > 0) {
    stringNumber = ' lẻ'
  }
  if (unit === 5 && dozen > 1) {
    stringNumber += ' lăm'
  } else if (unit > 1 || (unit === 1 && dozen === 0)) {
    stringNumber += ` ${arrayNumber[unit]}`
  }
  return stringNumber
}

const block = (number, full) => {
  let stringNumber = ''
  const hundred = Math.floor(number / 100)
  number %= 100
  if (full || hundred > 0) {
    stringNumber = ` ${arrayNumber[hundred]} trăm`
    stringNumber += redDozens(number, true)
  } else {
    stringNumber = redDozens(number, false)
  }
  return stringNumber
}

const redMillions = (number, full) => {
  let stringNumber = ''
  const milion = Math.floor(number / 1000000)
  number %= 1000000
  if (milion > 0) {
    stringNumber = `${block(milion, full)} triệu`
    full = true
  }
  const thousand = Math.floor(number / 1000)
  number %= 1000
  if (thousand > 0) {
    stringNumber += `${block(thousand, full)} nghìn`
    full = true
  }
  if (number > 0) {
    stringNumber += block(number, full)
  }
  return stringNumber
}

export const convertToWords = number => {
  if (number === 0) {
    return arrayNumber[0]
  }
  let stringNumber = ''
  let hauto = ''
  let bilion = 0
  do {
    bilion = number % 1000000000
    number = Math.floor(number / 1000000000)
    if (number > 0) {
      stringNumber = redMillions(bilion, true) + hauto + stringNumber
    } else {
      stringNumber = redMillions(bilion, false) + hauto + stringNumber
    }
    hauto = ' tỷ'
  } while (number > 0)
  stringNumber = stringNumber.trim()
  stringNumber = stringNumber.charAt(0).toUpperCase() + stringNumber.slice(1)
  return stringNumber
}

export const generateRandomIntegerInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const roundNumber = (money, precision = 0, isRoundDown = false) => {
  const roundFunc = isRoundDown ? Math.floor : Math.round
  return roundFunc(money * Math.pow(10, precision)) / Math.pow(10, precision)
}
