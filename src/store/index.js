import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user.js'
import app from './modules/app'
import theme from './modules/theme.js'

export default createStore({
  getters,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    app,
    theme
  }
})
