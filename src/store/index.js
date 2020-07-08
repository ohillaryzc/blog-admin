import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsed: false
  },
  mutations: {
    setCollapsed (state) {
      state.isCollapsed = !state.isCollapsed
    }
  },
  actions: {
  },
  modules: {
  }
})
