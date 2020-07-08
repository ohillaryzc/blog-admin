import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsed: false,
    menus: []
  },
  mutations: {
    setCollapsed (state) {
      state.isCollapsed = !state.isCollapsed
    },
    setMenus (state, menus) {
      state.menus = menus
    }
  },
  actions: {
  },
  modules: {
  }
})
