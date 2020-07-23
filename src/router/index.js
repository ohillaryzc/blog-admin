import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout/Layout'

Vue.use(VueRouter)

// 同步路由
const syncRoutesMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      keepAlive: false
    },
    component: () => import('../views/login')
  },
  {
    path: '',
    name: 'Layout',
    hidden: 'true',
    meta: {
      keepAlive: true
    },
    component: Layout
  },
  {
    path: '/article',
    name: 'article',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'ios-paper',
      keepAlive: true
    },
    children: [
      {
        path: 'list',
        name: 'article-list',
        component: () => import('../views/article/list'),
        meta: {
          title: '文章列表',
          keepAlive: true
        }
      },
      {
        path: 'add',
        name: 'article-add',
        component: () => import('../views/article/add'),
        meta: {
          title: '编辑文章',
          keepAlive: true
        }
      },
      {
        name: 'catch',
        path: 'catch',
        component: () => import('../views/article/catch'),
        meta: {
          title: '文章拉取',
          keepAlive: true
        }
      }
    ],
    redirect: '/article/list'
  },
  {
    path: '/setup',
    name: 'setup',
    component: Layout,
    meta: {
      title: '个人设置',
      icon: 'md-aperture',
      keepAlive: true
    },
    children: [
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/setup/about'),
        meta: {
          title: '信息设置',
          keepAlive: true
        }
      }
    ],
    redirect: '/setup/about'
  }
]

// 异步路由
const asyncRoutesMap = []

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 比如node路由/admin对应index.html，base则替换成'/admin'，history路由即可正常运行
  routes: syncRoutesMap
})

export default router
export {
  syncRoutesMap,
  asyncRoutesMap
}
