<template>
  <div id="app">
    <!-- <v-app :dark="true"> -->
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Levels from './components/youtalk/Levels'
import Login from './components/auth/Login'
export default {
  name: 'app',
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('accounts', ['profile']),
  },
  components: {
    'youtalk-levels': Levels,
    'auth-login': Login,
  },
  methods: {
    get_data() {
      if (this.isAuthenticated) {
        this.$store.dispatch('youtalk/GET_LEVELS')
        this.$store.dispatch('youtalk/GET_USERLEVELS')
        this.$store.dispatch('accounts/GET_SETTINGS')
        this.$vuetify.theme.dark = this.profile.theme
      }else{
        console.log()
      }
    }
  },
  created() {
    this.get_data()
    axios.interceptors.response.use(response => {
    const userToken = localStorage.getItem('user-token');
    if (userToken) {

      const decoded = jwt_decode(userToken)
      const exp = decoded.exp
      const orig_iat = decoded.orig_iat

      if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
        this.store.dispatch('auth/REFRESH_TOKEN', {'token': userToken} )//.then(() => {
        if (this.profile.user) {
          if (this.profile.user.is_superuser) {
            alert('refresh token right now')
          }
        }
      }else if (exp - (Date.now() / 1000) < 1800) {
        console.log('do nothing, do not refresh')
      }else{
        console.log('I am alive')
      }
    }
    return response
    }, error => {
      if (error.response.status === 401) {
        this.store.dispatch('auth/LOGOUT').then(() => {
          router.push({name: 'index'}).catch(err => {
            console.log('status: 401')
          });
        });
      }
    return Promise.reject(error);
    })


  },
};
</script>

<style>
html {
  overflow-y: auto; 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
