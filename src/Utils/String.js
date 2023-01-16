export const capitializeFirstLetter = (str = '') => {
  return str === null ? '' : str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalize = (str = '') => {
  return str === null
    ? ''
    : str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
}

export const upperCase = (str = '') => {
  return str === null ? '' : str.toLocaleUpperCase()
}

export const lowerCase = (str = '') => {
  return str === null ? '' : str.toLocaleLowerCase()
}

export function removeSpecialCharAccountNumber(value) {
  return value != null ? value.replace(/[^0-9 ]/g, '') : ''
}

export function replaceSpecialCharacters(value) {
  return value != null ? value.replace(/[^a-zA-Z ]/g, '') : ''
}

export const hideFirstCharAccountName = accountName => {
  const splits = accountName.split(' ')
  const lastName = splits[splits.length - 1]
  let hideChar = ''
  for (let i = 0; i <= splits.length - 2; i++) {
    hideChar = hideChar + Array(splits[i].length + 1).join('*') + ' '
  }
  return `${hideChar}${lastName}`
}

export const showLastCharAccountNumber = accountNumber => {
  if (accountNumber.length > 4) {
    const lastAccountNumber = accountNumber.substring(
      accountNumber.length - 4,
      accountNumber.length,
    )
    return Array(accountNumber.length - 4).join('*') + lastAccountNumber
  }
  return accountNumber
}
export const hideCharPhoneNumber = (phoneNumber, isHide = false) => {
  if (!isHide) {
    return phoneNumber
  }
  if (phoneNumber?.length > 9) {
    const firstPhoneNumber = phoneNumber.substring(0, phoneNumber.length - 3)
    const lastPhoneNumber = phoneNumber.substring(
      phoneNumber.length - 4,
      phoneNumber.length,
    )
    return firstPhoneNumber + Array(lastPhoneNumber.length).join('*')
  }
}
export const hideCharEmail = (email, isHide = false) => {
  if (!isHide) {
    return email
  }
  if (email?.trim().length > 0) {
    const splits = email.split('@')
    const firstChar = email.substring(0, splits[0].length)
    return Array(firstChar.length + 1).join('*') + '@' + splits[1]
  }
}
