import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Icon, Menu, Submenu, MenuItem, Poptip } from 'view-design'
import 'view-design/dist/styles/iview.css'
import './assets/css/cover.css'

const iViewComponents = { Button, Icon, Menu, Submenu, MenuItem, Poptip }
Object.keys(iViewComponents).forEach(key => {
  Vue.component(key, iViewComponents[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
