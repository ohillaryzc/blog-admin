import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { syncRoutesMap, asyncRoutesMap } from './router'
import store from './store'
import { getRouterMap } from './utils'
import markdown from 'mavon-editor'
import {
  Button,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  Poptip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  Checkbox,
  Table,
  Tag,
  Page,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Upload,
  Avatar,
  Modal,
  Message,
  Badge
} from 'view-design'
import search from './components/search'
import 'view-design/dist/styles/iview.css'
import './assets/css/cover.css'
import 'mavon-editor/dist/css/index.css'
import { tokenLogin } from './api'

const iViewComponents = { Button, Modal, Badge, Message, Icon, Menu, Submenu, MenuItem, Poptip, Breadcrumb, BreadcrumbItem, Form, FormItem, Input, Select, Option, DatePicker, Checkbox, Table, Tag, Page, Dropdown, DropdownItem, DropdownMenu, Upload, Avatar }
Object.keys(iViewComponents).forEach(key => {
  Vue.component(key, iViewComponents[key])
})
Vue.component('search', search)
Vue.prototype.$Message = Message
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (!store.state.user.id && !whiteList.includes(to.path)) {
    // 获取用户信息，保存在vuex
    tokenLogin().then(res => {
      store.commit('setUser', res)
      const asyncMap = []
      asyncRoutesMap.forEach(item => {
        if (item.meta.role.includes(res.role)) {
          asyncMap.push(item)
        }
      })
      router.addRoutes(asyncMap)
      // 生成路由表 permission
      const menus = getRouterMap(syncRoutesMap.concat(asyncMap), res.role)
      console.log(menus)
      store.commit('setMenus', menus)
      next({ ...to })
    }, () => {
      if (to.path === '/login') {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  } else {
    if (to.meta.role && !to.meta.role.includes(store.state.user.role)) {
      next({ path: '/intercept/403' })
    } else {
      const titles = [
        to.matched[0].meta.title,
        to.meta.title
      ]
      store.commit('keepRouter', to)
      store.commit('setTitles', titles)
      next()
    }
  }
})

Vue.use(markdown)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
