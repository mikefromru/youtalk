import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import store from './store/index'

import facebookLogin from 'facebook-login-vuejs'

axios.defaults.baseURL = 'http://localhost:8000'
// axios.defaults.baseURL = 'https://56edfe49.ngrok.io'

axios.interceptors.request.use(function (config) {
  const userToken = localStorage.getItem('user-token');
  if(userToken) config.headers['Authorization'] = `JWT ${userToken}`;
  return config;
})
//
axios.interceptors.response.use(response => {
  return response
  }, error => {
      if (error.response.status === 401) {
        console.log('<<< I am from check_auth() >>>')
        store.dispatch('auth/LOGOUT').then(() => {
          router.push({name: 'index'}).catch(err => {
            console.log('<<<, fucking bitch motherfucker .>>')
          });
        });
      }
      // return error;
  return Promise.reject(error);
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
