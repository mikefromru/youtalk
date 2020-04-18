<template>
<v-app light>

	<v-app-bar flat fixed>
  	<v-row>
			<v-icon class='pr-5' large @click="goHome()">keyboard_backspace</v-icon>
			<v-toolbar-title><span>English - Fighter</span></v-toolbar-title>
  	</v-row>
	</v-app-bar>


  <v-container fluid fill-height>
    <v-row align-center justify="center">
      <v-flex xs12 sm8 md4>
        <v-card flat color="transparent">
          <v-alert class="ml-4" v-model="alert" outlined type="error" dismissible>
            <span v-for="x in message" :key="x.id">
              <div v-if="typeof x === 'string'">{{ x }}</div>
              <div v-else-if="Array.isArray(x)">{{ x.join() }}</div>
              <div v-else>{{ x }}</div>
            </span>
          </v-alert>

          <v-row align-center justify="start">
            <v-card-title class="ml-3">
              <span class="logotextTMP">Sign in</span>
            </v-card-title>
            <!-- <img class="icon-logo" src="/static/images/logo/new-logo.jpeg" alt /> -->
          </v-row>

          <v-card-text class="ml-3">
            <v-form @submit.prevent="login">
              <v-text-field
                type="text"
                label="E-mail or username"
                v-model="username"
                outlined
                color="#757575"
              ></v-text-field>

              <v-text-field
                class="login-input"
                label="Password"
                v-model="password"
                outlined
                color="#757575"
		            :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
		            :type="show_pass ? 'text' : 'password'"
		            @click:append="show_pass = !show_pass"
		            
              ></v-text-field>

                <v-btn
                  height="60"
                  large
                  color="#E91E63"
                  dark
                  block
                  type="submit"
                >Sign in</v-btn>

            </v-form>

						<v-row justify-center>
              <router-link class="pr-3 mt-3 grey--text" :to="{name: 'reset_password'}">Forgot your password ?</router-link>
            </v-row>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</v-app>
</template>


<script>
import { mapState } from 'vuex'
import facebookLogin from 'facebook-login-vuejs';
export default {
	name: 'Login',
	data() {
		return {
      googleSignInParams: {
        client_id: '472332632554-s5136eed04fuqlhs9gcis6ve99jdupp0.apps.googleusercontent.com'
      },
      show_pass: false,
			username: '',
			password: '',
			message: '',
			alert: false,
		}
	},
	computed: {
		 ...mapState('auth', ['auth_error'])
	},
	components: {
		facebookLogin
	},
	methods: {
		getUserData() {
	    var token = this.FB.getAuthResponse()['accessToken'];
	    this.$store.dispatch('auth/AUTH_SOCIAL_FACEBOOK', {access_token: token})
			.then(() => {
				this.$store.dispatch('accounts/GET_SETTINGS')
		    this.$store.dispatch('youtalk/GET_LEVELS')
		    this.$store.dispatch('youtalk/GET_USERLEVELS')
				this.$router.push({name: 'index'}).catch(err =>{})
      })
      .catch(error => {
        console.log('something went wrong')
      })

		},
		
	  sdkLoaded(payload) {
	    this.isConnected = payload.isConnected
	    this.FB = payload.FB
	    if (this.isConnected) this.getUserData()
	  },
	  onLogin() {
	    this.isConnected = true
	    this.getUserData()
	  },
	  onLogout() {
	    this.isConnected = false;
	  },

	  connectToFacebook() {
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      window.fbAsyncInit = function() {
        FB.init({
          appId: '1498914273473730',
	        xfbml: true,
	        version: 'v3.3',
        })
        FB.getLoginStatus(function (response) {
          if (response.status === 'connected') {
           console.log('--- connected ---')
          } else if (response.status === 'not_authorized') {
            console.log('<----- not not_authorized ------>')
          } else {
            console.log('<----- else ---->', response)
          }
        })
	    }
	  },

		onGoogleSignInSuccess(response) {
			// console.log(response, '<<<<<< response >>>>>>')
      const token = response.tc.access_token

      this.$store.dispatch('auth/AUTH_SOCIAL_GOOGLE', {access_token: token})

			.then(() => {
				this.$store.dispatch('accounts/GET_SETTINGS')
		    this.$store.dispatch('youtalk/GET_LEVELS')
		    this.$store.dispatch('youtalk/GET_USERLEVELS')
				this.$router.push({name: 'index'}).catch(err =>{})

      })
      .catch(error => {
        console.log(error)
      })

		},

    login() {
      this.loader = 'loading3'
      const {username, password} = this
      this.$store.dispatch('auth/AUTH_REQUEST', {username, password})
      .then(() => {
				this.$store.dispatch('accounts/GET_SETTINGS')
		    this.$store.dispatch('youtalk/GET_LEVELS')
		    this.$store.dispatch('youtalk/GET_USERLEVELS')
				this.$router.push({name: 'index'}).catch(err =>{})
      })
      .catch(error => {
      	console.log(error, '< error')
        this.alert = true
        this.message = JSON.parse(this.auth_error);
      })
    },
  
		goHome() {
			this.$router.push({name: 'index'})
		}

	},
                  
};
</script>

<style scoped>
.v-btn { font-size: 18px; }
v-icon {cursor: pointer;}

div.container.button {
	margin-top: 7px !important;
	padding: 0 !important;

}
.facebook button {
	width: 100% !important;
	height: 45px;
	padding: 0 !important;
}
img {
	display: none !important;
}

</style>


