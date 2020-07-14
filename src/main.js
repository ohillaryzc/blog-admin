import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { syncRoutesMap } from './router'
import store from './store'
import { getRouterMap } from './utils'
import markdown from 'mavon-editor'
import { Button, Icon, Menu, Submenu, MenuItem, Poptip, Breadcrumb, BreadcrumbItem, Form, FormItem, Input, Select, Option, DatePicker, Checkbox, Table, Tag, Page, Dropdown, DropdownItem, DropdownMenu, Upload, Avatar } from 'view-design'
import 'view-design/dist/styles/iview.css'
import './assets/css/cover.css'
import 'mavon-editor/dist/css/index.css'
import { tokenLogin } from './api'

const iViewComponents = { Button, Icon, Menu, Submenu, MenuItem, Poptip, Breadcrumb, BreadcrumbItem, Form, FormItem, Input, Select, Option, DatePicker, Checkbox, Table, Tag, Page, Dropdown, DropdownItem, DropdownMenu, Upload, Avatar }
Object.keys(iViewComponents).forEach(key => {
  Vue.component(key, iViewComponents[key])
})

// 生成路由表
const menus = getRouterMap(syncRoutesMap)
store.commit('setMenus', menus)
router.beforeEach((to, from, next) => {
  const titles = [
    to.matched[0].meta.title,
    to.meta.title
  ]
  store.commit('setTitles', titles)
  next()
})

// 获取用户信息，保存在vuex
// const asyncLogin = async function () {
//   return await tokenLogin()
// }
tokenLogin().then(res => {
  store.commit('setUser', res)
  console.log(router.toString())
  if (router.currentRoute.path === '/login') { // 应该有一个token白名单，没有token才能访问
    router.push('/')
  }
})

Vue.use(markdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
