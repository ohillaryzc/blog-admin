import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { syncRoutesMap } from './router'
import store from './store'
import { getRouterMap } from './utils'
import { Button, Icon, Menu, Submenu, MenuItem, Poptip, Breadcrumb, BreadcrumbItem, Form, FormItem, Input, Checkbox } from 'view-design'
import 'view-design/dist/styles/iview.css'
import './assets/css/cover.css'

const iViewComponents = { Button, Icon, Menu, Submenu, MenuItem, Poptip, Breadcrumb, BreadcrumbItem, Form, FormItem, Input, Checkbox }
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
