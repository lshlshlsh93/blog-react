/**
 * @author lishaohui
 * @description 封装了对localStorage的操作
 */

/**
 * 设置缓存信息
 */
const setLocalCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取key缓存信息
 * @param {*} key key
 * @returns 缓存信息
 */
const getLocalCache = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

/**
 * 根据key移除缓存信息
 * @param {*} key  key
 */
const removeLocalCache = (key) => {
  localStorage.removeItem(key)
}

/**
 * 清除所有缓存信息
 */
const clearLocalCache = () => {
  localStorage.clear()
}

export { setLocalCache, getLocalCache, removeLocalCache, clearLocalCache }
