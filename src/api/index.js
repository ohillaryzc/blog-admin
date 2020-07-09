/* api请求 */
import { myPost } from '../utils/request'

/**
 * 游客登录
 * @param {Object} [params]
 * */
export function visitorLogin (params) {
  return myPost({
    url: '/login',
    params: params || {}
  })
}

/**
 * 获取文章列表
 * @param {Object} [params]
 * */
export function getArticleList (params) {
  return myPost({
    url: '/get/article/list',
    params: params || {}
  })
}

/**
 * 获取所有分类
 * @param {Object} [params]
 * */
export function getClassify (params) {
  return myPost({
    url: '/get/classify/list',
    params: params || {}
  })
}

/**
 * 获取所有标签
 * @param {Object} [params]
 * */
export function getTags (params) {
  return myPost({
    url: '/get/tag/list',
    params: params || {}
  })
}
