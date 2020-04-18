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
          <v-alert class="alertRegister" v-model="alert" outlined type="error" dismissible>
            <span v-for="x in message" :key="x.id">
              <div v-if="typeof x === 'string'">{{ x }}</div>
              <div v-else-if="Array.isArray(x)">{{ x.join() }}</div>
              <div v-else>{{ x }}</div>
            </span>
          </v-alert>

          <v-row align-center justify="start">
            <v-card-title class="ml-3">
              <span class="logotextTMP">Sign up</span>
            </v-card-title>
            <!-- <img class="icon-logo" src="/static/images/logo/new-logo.jpeg" alt /> -->
          </v-row>

          <v-card-text class="ml-3">
            <v-form @submit.prevent="register">
              <v-text-field
                class="login-input"
                type="text"
                label="Username"
                v-model="username"
                outlined
                color="#757575"
              ></v-text-field>

              <v-text-field
                class="login-input"
                type="email"
                label="E-mail"
                v-model="email" 
                outlined
                color="#757575"
              ></v-text-field>
              
              <v-text-field
                class="login-input"
                label="Password"
                type="password"
                v-model="password1"
                outlined
                color="#757575"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              
              ></v-text-field>

              <v-text-field
                class="login-input"
	              label="Password again"
                type="password"
                v-model="password2"
                outlined
                color="#757575"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
              
              ></v-text-field>

                <v-btn
                  height="60"
                  large
                  block
                  color="#E91E63"
                  class="white--text"
                  type="submit"
                >Create account</v-btn>

            </v-form>


						<v-row justify-center>
              <router-link class="pr-3 mt-3 grey--text" :to="{name: 'login'}">You have an account ?</router-link>

            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</v-app>
</template>

<script>
import { mapGetters } from "vuex"
import { mapState } from "vuex"
export default {
  name: "Register",
  computed: {
    ...mapGetters("accounts", ["user"]),
    ...mapState('auth', ['auth_error'])
  },
  data() {
    return {
      show1: false,
      show2: false,
      alert: false,
      message: '',

      username: "",
      email: "",
      password1: "",
      password2: "",
      googleSignInParams: {
        client_id: '472332632554-s5136eed04fuqlhs9gcis6ve99jdupp0.apps.googleusercontent.com'
      }
    };
  },
  methods: {
    onGoogleSignInSuccess(response) {
      const token = response.Zi.access_token;
      this.$store
        .dispatch("AUTH_SOCIAL_GOOGLE", {
          access_token: token
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    register() {
      this.loader = 'loading3'
      const { username, email, password1, password2 } = this;
      this.$store.dispatch("auth/REGISTRATION", { username, email, password1, password2 })
      .then(response => {
        this.$router.push({name: 'index', params: { 
          status: true,
          text: 'Please confirm your email address',
          }
        })
      })
      .catch(error => {
        this.alert = true
        this.message = JSON.parse(this.auth_error);
      });
    },
		goHome() {
			this.$router.push({name: 'index'})
		}
  },

};
</script>

<style scoped>
.alertRegister {
  margin-top: 70px;
  margin-left: 14px;
}
.v-btn { font-size: 18px; }
</style>

