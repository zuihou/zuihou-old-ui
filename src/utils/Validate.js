// 检查是否是身份证号码
function isIdCard (id) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(id)
}

// 检查是否是护照号码
function isPassportCard (id) {
  const reg = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/
  return reg.test(id)
}

// 检查是否是手机号
function isPhoneNumber (id) {
  const reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
  return reg.test(id)
}

export default {
  isIdCard,
  isPassportCard,
  isPhoneNumber
}
