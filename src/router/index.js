import Vue from 'vue'
import VueRouter from 'vue-router'
import { ADMIN } from '../role.config'
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
    path: '/',
    name: 'Layout',
    hidden: 'true',
    meta: {
      keepAlive: true
    },
    component: Layout,
    children: [
      {
        path: 'desktop',
        name: 'desktop',
        meta: {
          title: '工作台',
          icon: '',
          keepAlive: true
        },
        component: () => import('../views/desktop')
      }
    ],
    redirect: '/desktop'
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
          keepAlive: true,
          role: [ADMIN]
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
    name: 'timeline',
    path: '/timeline',
    component: Layout,
    meta: {
      title: '时间线',
      icon: 'md-clock',
      keepAlive: true
    },
    children: [
      {
        name: 'todo',
        path: 'todo',
        component: () => import('../views/timeline/todo'),
        meta: {
          title: '待办(todo-list)',
          keepAlive: true,
          role: [ADMIN]
        }
      }
    ]
  },
  {
    name: 'intercept',
    path: '/intercept/:code',
    hidden: true,
    meta: {
      keepAlive: false
    },
    component: () => import('../views/error/intercept')
  }
]

// 异步路由
const asyncRoutesMap = [
  {
    path: '/setup',
    name: 'setup',
    component: Layout,
    meta: {
      title: '个人设置',
      icon: 'md-aperture',
      keepAlive: true,
      role: [ADMIN]
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
  },
  {
    name: 'user',
    path: '/user',
    component: Layout,
    meta: {
      title: '账号管理',
      icon: 'md-contact',
      keepAlive: true,
      role: [ADMIN]
    },
    children: [
      {
        name: 'userList',
        path: 'list',
        component: () => import('../views/user'),
        meta: {
          title: '账号列表',
          keepAlive: true
        }
      }
    ]
  }
]

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
