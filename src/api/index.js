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
 * 通过token判断有没有过期
 * */
export function tokenLogin () {
  return myPost({
    url: '/token/login'
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

/**
 * 发布文章
 * @param {Object} params
 * */
export function publishArticle (params) {
  return myPost({
    url: '/add/article',
    params
  })
}

/**
 * 获取about信息
 * */
export function getAbout () {
  return myPost({
    url: '/get/about'
  })
}
