/**
 * @author lishaohui
 * @description 封装了分页的一些公共方法
 */

/**
 * 根据页大小和总条数计算有多少页
 * @param {*} pageSize 页大小
 * @param {*} total 总条数
 * @returns 页码
 */
export function getPageTotal(pageSize = 10, total = 1) {
  return parseInt((total + pageSize - 1) / pageSize)
}
