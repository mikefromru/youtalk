<template>
  <v-app id="">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card flat color="transparent"  class="ml-5 pb-5"> 

	          	<v-toolbar flat color="transparent">
            		<v-row justify="center">
		              <v-toolbar-title><h1>English - Fighter</h1></v-toolbar-title>
		            </v-row>
              </v-toolbar>
              <v-card-text>
           			<p class="text-center">Practice makes perfect</p> 
              </v-card-text>

  	          <g-signin-button
		            :params="googleSignInParams"
		            @success="onGoogleSignInSuccess">
	              <v-btn block large color='red' class="white--text" type=submit>Log in To Google</v-btn>
		          </g-signin-button>

				      <div class="facebook">
			          <facebook-login class="button"
						      appId="1498914273473730"
						      @login="onLogin"
						      @get-initial-status="getUserData"
						      @sdk-loaded="sdkLoaded"
						      @logout="onLogout"
						      >
						    </facebook-login>
							</div>

            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>



<script>
import facebookLogin from 'facebook-login-vuejs';
export default {
	name: 'Login',
	data() {
		return {
      googleSignInParams: {
        client_id: '472332632554-s5136eed04fuqlhs9gcis6ve99jdupp0.apps.googleusercontent.com'
      },
			username: '',
			password: ''
		}
	},
	components: {
		// 'facebook-login': facebookLogin
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
			const { username, password } = this
			this.$store.dispatch('auth/AUTH_REQUEST', { username, password })
			.then(() => {
				this.$store.dispatch('accounts/GET_SETTINGS')
		    this.$store.dispatch('youtalk/GET_LEVELS')
		    this.$store.dispatch('youtalk/GET_USERLEVELS')
				this.$router.push({name: 'index'}).catch(err =>{})

			})
			.catch(error => {
				console.log(error)
			})
		}
	},
	created() {
		// this.connectToFacebook()
	}
};
</script>

<style>
.spinner {
	display: none !important;
}
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


