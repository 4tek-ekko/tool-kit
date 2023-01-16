import i18n from '@/Translations/i18n'

const translation = i18n.t

export function validateUserName(value) {
  const regexSpecialString =
    /[!@#$%^&*()+\- =[\]{};':"\\|,.<>/?ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/
  if (value.trim().length === 0) {
    return translation('authPage.errorRequireUserName')
  }
  if (value.trim().length < 6) {
    return translation('authPage.errorRequireUserNameMin6')
  }
  if (value.trim().length >= 30) {
    return translation('authPage.errorRequireUserNameMax30')
  }
  if (regexSpecialString.test(value.trim())) {
    return translation('authPage.errorRequireUserNameNotContainSpecial')
  }
  return ''
}

export function validateUserPass(value) {
  const regexSpecialString =
    /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()+=-?;,./{}|":<>[\]\\'-~_]{8,}$/
  if (value.trim().length === 0) {
    return translation('authPage.errorRequirePass')
  }
  if (value.trim().length < 8) {
    return translation('authPage.errorRequireUserPassMin8')
  }
  if (!regexSpecialString.test(value.trim())) {
    return translation('authPage.errorRequireUppercaseAndNumber')
  }
  return ''
}

export function validateUserPassSimple(value) {
  if (value.trim().length === 0) {
    return translation('authPage.errorRequirePass')
  }
  if (value.trim().length < 6) {
    return translation('authPage.errorRequireUserPassMin6')
  }
  return ''
}

export function validateUserOldPass(value, oldPass) {
  if (oldPass.trim() !== value.trim()) {
    return translation('authPage.notSameOldPass')
  }
  return ''
}

export function validateConfirmPass(pass, confirmPass) {
  if (confirmPass.trim().length === 0) {
    return translation('authPage.errorRequirePass')
  }
  if (confirmPass.trim().length < 6) {
    return translation('authPage.errorRequireUserPassMin6')
  }
  if (confirmPass.trim() !== pass.trim()) {
    return translation('authPage.notSamePass')
  }
  return ''
}

export function validateUserPhone(value) {
  const regexDisplayString =
    /[ !@#$%^&*()+\-=[\]{};':"\\|,.<>/?ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/
  if (value.trim().length === 0) {
    return translation('authPage.errorRequirePhone')
  }
  if (value.trim().length < 10) {
    return translation('authPage.errorRequireUserPhoneMin10')
  }
  if (value.trim().charAt(0) !== '0') {
    return translation('authPage.errorRequireUserPhoneStart0')
  }
  if (regexDisplayString.test(value.trim())) {
    return translation('authPage.errorRequireUserPhoneSymbol')
  }
  return ''
}

export function validateEmail(value) {
  const regExp = /^[+._\-\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!regExp.test(value)) {
    return translation('authPage.errorIncorrectEmail')
  }
  return ''
}

export function validateFullName(value) {
  const regexDisplayString =
    /[ !@#$%^&*()+\-=[\]{};':"\\|,.<>/?ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/
  if (value.trim().length === 0) {
    return translation('account.requireDisplayName')
  }
  if (value.trim().length < 6) {
    return translation('account.requireLengthDisplayName')
  }
  if (regexDisplayString.test(value.trim())) {
    return translation('account.errorRequireNameNotContainSpecial')
  }
  return ''
}

export function validateWithdrawMoney(value) {
  if (value.trim().length === 0) {
    return translation('withdrawBank.errorMoneyEmpty')
  }
  if (value.trim() < 100) {
    return translation('withdrawBank.errorMoneyMin')
  }
  if (value.trim() > 1000000) {
    return translation('withdrawBank.errorMoneyMax')
  }
  return ''
}
