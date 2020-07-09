/* 工具方法 */
/**
 * @param {Array} arr 一个router结构的数组
 * @returns {Array}
 * */
function getRouterMap (arr) {
  const result = []
  arr.forEach(item => {
    if (!item.hidden) {
      let children = []
      if (item.children) {
        children = getRouterMap(item.children)
      }
      result.push({ path: item.path, meta: item.meta, children })
    }
  })
  return result
}

export {
  getRouterMap
}
