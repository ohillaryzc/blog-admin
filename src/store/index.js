import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isCollapsed: false,
    menus: [],
    titles: []
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setCollapsed (state) {
      state.isCollapsed = !state.isCollapsed
    },
    setMenus (state, menus) {
      state.menus = menus
    },
    setTitles (state, titles) {
      state.titles = titles
    }
  },
  actions: {
  },
  modules: {
  }
})
