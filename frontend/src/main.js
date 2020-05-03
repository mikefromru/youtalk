import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import store from './store/index'
import jwt_decode from 'jwt-decode'

import accounts from './store/modules/accounts'

import facebookLogin from 'facebook-login-vuejs'

// axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.baseURL = process.env.ENDPOINT

axios.interceptors.request.use(function (config) {
  const userToken = localStorage.getItem('user-token');
  if(userToken) config.headers['Authorization'] = `JWT ${userToken}`;
  return config;
})

import router from './routers/index'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.use(Vuesax, {

})


import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

new Vue({
	el: '#app',
  render: h => h(App),
  vuetify: new Vuetify(),
	router,
	store
})
