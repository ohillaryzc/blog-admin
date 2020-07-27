import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isCollapsed: false,
    menus: [],
    titles: [],
    tabsPath: [],
    tabs: [],
    activeTab: 0,
    requestLoading: false
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
    },
    keepRouter (state, to) {
      const index = state.tabsPath.indexOf(to.path)
      if (to.meta.title) {
        if (index > -1) {
          state.activeTab = index
        } else {
          state.tabsPath.push(to.path)
          state.tabs.push({ path: to.path, title: to.meta.title })
          state.activeTab = state.tabs.length - 1
        }
      }
    },
    closeWin (state, index) {
      state.tabs.splice(index, 1)
      state.tabsPath.splice(index, 1)
      if (index < state.activeTab) {
        state.activeTab = --state.activeTab
      }
    },
    setLoading (state, loading) {
      state.requestLoading = loading
    }
  },
  actions: {
  },
  modules: {
  }
})
