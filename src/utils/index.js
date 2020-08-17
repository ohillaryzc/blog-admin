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
      if (!item.meta.role || item.meta.role.includes(role)) {
        if (item.children) {
          // 一级菜单
          children = getRouterMap(item.children, role)
          if (children.length) { // 一级菜单下面有子菜单才会显示(children.length > 0)
            result.push({ path: item.path, meta: item.meta, children })
          }
        } else {
          // 二级菜单
          result.push({ path: item.path, meta: item.meta })
        }
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
