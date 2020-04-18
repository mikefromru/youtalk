<template>
  <v-app light>
<!--     <v-toolbar fixed flat color='transparent'>
      <span class="pr-3">Home</span>
      <span class="pr-3">About</span>
      <span class="pr-3">Contact</span>
    </v-toolbar>

 --><!--     <v-row justify-center>
      <v-alert class="mt-3 valert" v-model='message.status' type="success" dismissible>{{ message.text }}</v-alert>
    </v-row>
 -->
 
    <v-container fluid fill-height class="mb-5">
      <v-row align-center justify="center">
        <v-card flat color='transparent' class="">

          <!-- <v-row justify="center"> -->
            <!-- <img class="logo" src="/static/images/logo/new-logo.jpeg" alt=""> -->

          <v-card-title primary-title class="display-1">
            <!-- <v-row justify="center"> -->
              English-Fighter
              <!-- <img class="ml-3" src="/static/images/logo/logo1.png" width="40" height="40" alt=""> -->
            <!-- </v-row> -->
          </v-card-title>

          <!-- <v-card-text class="description subheading font-weight-thin text-xs-center"> -->
          <v-card-text class="description text-center">
            Practice makes perfect
          </v-card-text>

          <!--
          <v-card-actions>
            <v-row justify-center>
              <v-btn large block color='success'>зарегистрироваться</v-btn>
              <v-btn large block color='success'>войти</v-btn>
            </v-row>
          </v-card-actions>

        -->

          <!-- </v-row> -->

        </v-card>
      </v-row>
    </v-container>

    <v-footer app color="transparent">
      <v-row>
        <!-- <v-col :class="$vuetify.breakpoint.smAndDown ? 'column' : 'row' "> -->
        <v-col cols="12" md="6">
          <v-btn class=registerbtn block large :to="{name: 'register'}">Sign in</v-btn>
        </v-col>

        <!-- <v-col :class="$vuetify.breakpoint.smAndDown ? 'column' : 'row' "> -->
        <v-col cols="12" md="6">
          <v-btn class=loginbtn block large :to="{ name: 'login' }">Log in</v-btn>
        </v-col>

      </v-row>
     </v-footer>
    
    <!-- <v-footer app height='70' class="myFooter"> -->

      <!-- <v-row :class="$vuetify.breakpoint.smAndDown ? 'column' : 'row' "> -->
      <!-- <v-row :class="$vuetify.breakpoint.xs ? 'column' : 'row' "> -->
<!--       <v-row>

        <v-card class="register-card" color='#E7E7E7'>
          <router-link :to="{name: 'register'}">
            <v-row align-center justify-center fill-height>
              <v-card-title class="title font-weight-regular">
                <span id='text-signin'>Зарегистрироваться</span>
              </v-card-title>
            </v-row>
          </router-link>
        </v-card>

        <v-card class="login-card" color='#3B56A5'>
          <router-link :to="{name: 'login'}">
            <v-row align-center justify-center fill-height>
              <v-card-title class="title font-weight-regular">
                <span id='text-login'>Войти</span>
              </v-card-title>
            </v-row>
          </router-link>
        </v-card>

      </v-row>

 -->   

  </v-app>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      message: {
        status: false,
        text: ''
      }
    }
  },
  created() {
    this.message.status = this.$route.params.status
    this.message.text = this.$route.params.text
  }
};
</script>

<style scoped>
.col-md-6, .col-12 {
  padding: 0 !important;
}
.registerbtn {
  height: 60px !important;
  font-size: 18px;
  background: #EEEEEE !important; 
  color: gray;
 
}
.loginbtn {
  height: 60px !important;
  font-size: 18px;
  color: white;
  background: #E91E63 !important; 
}
.myFooter {
   /*margin-bottom: 45px; */
}
.logo {
  /* background: red; */
  position: relative;
  /* padding-left: 20px; */
  top: -5px;
}
a {text-decoration: none}

#text-signin {
color: #353535;
}
#text-login {
color: white;
}

.register-card, .login-card {
  /*width: 100%;*/
  /*height: 100px;*/

}
.main {
  background: #fafafa;
  /* background:#0D83DD; */
  /* color: white; */
}

.resultContainer {
  height: 350px;
}

.item {
  min-height: 50px;
  min-width: 80px;
  /* margin: 10px; */
}
.text-logo {
  font-size: 34px;
  color: Black;
}
.description {
  position: relative;
  /* top: -25px; */
  color: #3f3f3f;
  font-size: 14px;
}

@media screen and (max-width: 599px) {
  .text-logo {
    font-size: 34px;
  }
  .description {
    font-size: 12px;
  }
  #text-signin {
    font-size: 18px;
  }
  #text-login {
    font-size: 18px;
  }

  .myFooter {
    position: fixed;
    margin-bottom: 35px;
  }
  .register-card,
  .login-card {
    /* width: 100%; */
    height: 70px;
  }
}
body {
  overflow-x: hidden;
}
/* @media screen and (max-width: 950px) {
  .myFooter {
    position: fixed;
    margin-bottom: 50px;
  }

} */

</style>