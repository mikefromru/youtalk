<template>
  <div id="app">
    <!-- <v-app :dark="true"> -->
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
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
        console.log('<<< ISAUTHENTICATED >>>')
        this.$store.dispatch('youtalk/GET_LEVELS')
        this.$store.dispatch('youtalk/GET_USERLEVELS')
        this.$store.dispatch('accounts/GET_SETTINGS')
        this.$vuetify.theme.dark = this.profile.theme
      }else{
        console.log(this.isAuthenticated, '<<< UNKNOW >>>')
      }
    }
  },
  created() {
    this.get_data()
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  
}

/*h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}*/
</style>
