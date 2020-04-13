import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import VuexPersist from 'vuex-persist/dist/umd'

const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage
})

import auth from './modules/auth'
import root from './modules/root'
import youtalk from './modules/youtalk'
import accounts from './modules/accounts'

export default new Vuex.Store({
  modules: {
	  auth,
    root,
    youtalk,
    accounts,
  },
  plugins: [vuexLocalStorage.plugin]
})