<template>
  <div>

    <v-app-bar flat>
    <transition name='fade'>
      <v-row v-if="show">
        <router-link :to="{ name: 'index' }">
          <v-icon class='pr-5' large>keyboard_backspace</v-icon>
        </router-link>
        <v-toolbar-title>Feedback</v-toolbar-title>
      </v-row>
    </transition>
    </v-app-bar>
  
    <v-container flat color="transparent">

      <v-card flat color="transparent">
        <v-select v-model='title'
          menu-props='auto'
          hide-details
          label="Select" 
          :items="items"
          single-lin>
        </v-select>
        <v-textarea rows='1' label="Your recommendation and suggestion" v-model="text"></v-textarea>
        <span class="feedback-helper">
          Whire your suggestion. We will definitely take it into consideration
        </span>

        <form class="pt-4" @submit.prevent ref="myForm">
          <v-icon large light
            type="submit"
            @click="$refs.inputUpload.click()"
          >photo</v-icon>
          <input
            v-show="false"
            ref="inputUpload"
            type="file"
            multiple
            @change="get_picture"
          />
          </form>
        <div class="" id="images"></div>
   
      </v-card>


      <v-card-actions class="pt-4 pb-4">
        <v-btn block dark color='#C2185B' @click="send">Send</v-btn>
      </v-card-actions>
      <span class="feedback-helper">
        This page is intended for feedback and any suggestions with regards to this application
      </span>

    </v-container>

  </div>
</template>

<script>
import axios from 'axios'
import Header from "../commons/Header";
import { mapGetters } from 'vuex'
export default {
  name: "Feedback",
  data() {
    return {
      message: {
        status: false, 
        text: '',
        type: null,
      },
      fileNames: [],
      title: 'Report a problem',
      text: '',

      items: ['Report a problem', 'Suggest a new feature'],
      show: false
    }
  },
  components: {
    "ef-header": Header
  },
  computed: {
    ...mapGetters("accounts", ["profile"])
  },
  methods: {
    send() {
      let data = new FormData(this.$refs.myForm)
      data.append('title', this.title)
      data.append('text', this.text)
      data.append('user', this.profile.id)
      // data.append('user', this.user.id)

      for(var x =0; x < this.fileNames.length; x++) {
        let file = this.fileNames[x]
        data.append('files', file)
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      axios.post('/feedback/', data, config)
      .then(response => {
        this.$vs.notify({title:'Great!',text:'Thank you for your feedback!,  consectetur', color:'success'})
        this.title = 'Report a problem'
        this.text = ''
        const idImages = document.getElementById('images')
        idImages.innerHTML = ''

      })
      .catch(error => {
        this.$vs.notify({title:'Oops',text:'Something went wrong!,  consectetur', color:'danger'})
      })
    },
    get_picture() {
      console.log(this.fileNames.length, ' << fileNames length')
      if (this.fileNames.length < 5) {
        let fileUploaded = this.$refs.inputUpload.files[0]
        this.fileNames.push(fileUploaded)

        // Container images
        const containerImages = document.getElementById("images");
      
        const img = document.createElement("img");
        img.src = URL.createObjectURL(fileUploaded);
        img.height = 60;
        img.onload = function() {
          window.URL.revokeObjectURL(this.src);
        }
        containerImages.appendChild(img);
      }else{
        this.message = {'status': true, 'text': 'You can send only 2 photos.', 'type': 'info'}
      }
    }
  },
  mounted() {
    this.show = true
  }

};
</script>

<style>
.fade-enter-active {
  transition: opacity 0.70s
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.logo-name {
  font-size: 20px;
  color: grey;
}
a {
  text-decoration: none;
}
 .feedback-helper {
  color: grey;
}
img {
  /* pos
  position: relative; */
  margin-top: 5px;
  margin-right: 5px;
}
</style>