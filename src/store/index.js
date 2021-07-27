import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './Mutations'
import getters from './Getters'
import actions from './Actions'
// import modules from './Modules'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{

  },
  mutations,
  getters,
  actions,
  modules:{

  }
})
export default store
