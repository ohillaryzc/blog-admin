import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout/Layout'

Vue.use(VueRouter)

// 同步路由
const syncRoutesMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '',
    name: 'Layout',
    component: Layout
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
