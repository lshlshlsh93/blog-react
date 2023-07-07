/**
 *@description 函数节流，普通防连点
 * @param {function} cb
 * @param {number?} delay
 * @returns {function}
 */
export const _throttle = (cb, delay = 2000) => {
  let last, deferTimer
  return function () {
    const _now = +new Date()
    if (last && _now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        last = _now
      }, delay)
    } else {
      last = _now
      cb.apply(this, arguments)
    }
  }
}

/**
 * file文件转为Base64
 */
export function fileToBase64(file) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  const pro = new Promise((resolve) => {
    reader.onload = (e) => {
      resolve(e.target.result)
    }
  })
  return pro
}
