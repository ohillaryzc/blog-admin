/* 工具方法 */
/**
 * @param {Array} arr 一个router结构的数组
 * @param {String} [role]
 * @returns {Array}
 * */
export function getRouterMap (arr, role) {
  const result = []
  arr.forEach(item => {
    if (!item.hidden) {
      let children = []
      if (item.children) {
        children = getRouterMap(item.children, role)
      }
      if (!item.meta.role || item.meta.role.includes(role)) {
        result.push({ path: item.path, meta: item.meta, children })
      }
    }
  })
  return result
}

/**
 * 传入一个数组，返回一个带特殊标识的数组
 * @param {Array} source
 * @param {string} key
 * @return {Array} result
 * */
export function getKeyArray (source, key) {
  const result = []
  source.forEach(item => {
    result[key + item[key]] = item
  })
  return result
}
