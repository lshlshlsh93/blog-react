import validator from 'validator'

/**
 *  是否是合法邮箱地址
 * @param {*} email email
 * @returns
 */
function isValidEmail(email) {
  return validator.isEmail(email)
}

/**
 *
 * @param {*} password 密码
 * @param {*} min  最小
 * @param {*} max  最大
 * @returns
 */
function isValidPassword(password, min = 6, max = 16) {
  return validator.isLength(password, min, max)
}

export { isValidEmail, isValidPassword }
