/**
 *
 *@author lishaohui
 @description 封装了对sessionStorage的一些操作，并添加了有效期选项
 */

/**
 * 对sessionStorage进行封装缓存，添加有效期的选项
 * @param expireTime xx分钟
 */
export function setSessionCache(key, value, expireTime = 0) {
  const obj = {
    data: value,
    time: expireTime ? new Date().getTime() + expireTime * 1000 : 0,
  }
  sessionStorage.setItem(key, JSON.stringify(obj))
}

/**
 * 根据key获取缓存信息
 * @param {*} key key
 * @returns  缓存信息
 */
export function getSessionCache(key) {
  const valueStr = sessionStorage.getItem(key)
  if (!valueStr) {
    return null
  }
  const value = JSON.parse(valueStr)
  if (value?.time === 0) {
    return value?.data
  }
  const now = new Date().getTime()
  if (now >= value.time) {
    removeSessionCache(key)
    return null
  }
  return value?.data
}

/**
 * 根据key移除缓存信息
 * @param {*} key key
 */
export function removeSessionCache(key) {
  sessionStorage.removeItem(key)
}

/**
 * 清除所有缓存信息
 */
export function clearSessionCache() {
  sessionStorage.clear()
}
