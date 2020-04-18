import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import store from './store/index'
import jwt_decode from 'jwt-decode'

import accounts from './store/modules/accounts'

import facebookLogin from 'facebook-login-vuejs'

// axios.defaults.baseURL = 'http://localhost:8000'
// axios.defaults.baseURL = 'http://161.35.2.26'
axios.defaults.baseURL = process.env.ENDPOINT

axios.interceptors.request.use(function (config) {
  const userToken = localStorage.getItem('user-token');
  if(userToken) config.headers['Authorization'] = `JWT ${userToken}`;
  return config;
})

// axios.interceptors.response.use(response => {
//   const userToken = localStorage.getItem('user-token');
//   if (userToken) {

//     const decoded = jwt_decode(userToken)
//     const exp = decoded.exp
//     const orig_iat = decoded.orig_iat

//     if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
//       store.dispatch('auth/REFRESH_TOKEN', {'token': userToken} )//.then(() => {
//       console.log('refresh token right now')
//     }else if (exp - (Date.now() / 1000) < 1800) {
//       console.log('do nothing, do not refresh')
//     }else{
//       console.log(accounts.getters.profile, '<< profile >>>')
//     }
//   }
//   return response
//   }, error => {
//       if (error.response.status === 401) {
//         store.dispatch('auth/LOGOUT').then(() => {
//           router.push({name: 'index'}).catch(err => {
//             console.log('<<< status: 401 >>>')
//           });
//         });
//       }
//       // return error;
//   return Promise.reject(error);
//   })





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
