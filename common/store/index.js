import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import init from './modules/init.js'
import user from './modules/user.js'
import theme from './modules/theme.js'

const store = new Vuex.Store({
  modules: {
    init,
    user,
    theme
  }
})

export default store
