<template>
	<div>
	  <div>
      <v-app-bar fixed dense flat color="">
	      <v-toolbar-title><span id="title-name">You Talk </span></v-toolbar-title>
	      <v-spacer></v-spacer>
	      <v-menu
	        left
	        bottom
	      >
	        <template v-slot:activator="{ on }">
	          <v-btn icon v-on="on">
	            <v-icon>mdi-dots-vertical</v-icon>
	          </v-btn>
	        </template>
          <v-list>
            <v-list-item v-for="(item, index) in newItems" :key="index" @click="menu(item.id)">
             <v-list-item-title>{{ item.title }}</v-list-item-title>
	          </v-list-item>
	        </v-list>
	      </v-menu>
	    </v-app-bar>
	  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data:()=>({
    is_superuser: null,
  	sidebar: false,
    activeItem: 0,
    search: '',
    inset: false,
    root_items: { id: 5, title: 'Root', icon: '' }, 
    items: [
      { id: 0, title: 'Root', icon: '' },
      { id: 1, title: 'Settings', icon: 'settings' },
      { id: 2, title: 'Feedback', icon: 'question_answer' },
      { id: 3, title: 'Faforite', icon: 'mdi-heart' },
      { id: 4, title: 'Log out', icon: 'exit_to_app' }, ],
  }),
  computed: {
    ...mapGetters('accounts', ['profile']),
    newItems() {
      // if (this.profile.user.is_superuser) {
      if (this.is_superuser) {
        return this.items
      }else{
        return this.items.slice(1)  
      }
    }

  },
  methods: {
    menu(index) {
      if (index === 0) {
          this.$router.push({name: 'root_levels'});
      } else if (index === 1) {
          this.$router.push({name: 'settings'});
      } else if (index === 2) {
        this.$router.push({name: 'feedback'});
      } else if (index === 3) {
          this.$router.push({name: 'favorite'});
      }else if (index === 4) {
        this.$store.dispatch("auth/LOGOUT").then(() => {
        localStorage.clear()
          this.$router.push({name: 'index'}).catch(err => {});
        })
      } else {
        console.log("undefined");
      }
    },

  	sideBar() {
  		this.sidebar = true
  	}
  },
  watch: {
    profile() {
      this.is_superuser = this.profile.user.is_superuser
    }
  }

};
</script>

<style>
#title-name {
	font-style: italic;	
	/*color: white;*/
	/*color: red;*/
	/*color: #F2135D;*/
	/*font-weight: bold;*/
}
html.vuesax-app-is-ltr {
	margin: 0;
	padding: 0;

}
html, body {
	margin: 0;
	padding: 0;
}
.nabarx {
}
.vs-navbar--header {
}
</style>
