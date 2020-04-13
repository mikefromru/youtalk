<template>
	<div>

		<!-- <youtalk-header/> -->


	  <div>
      <v-app-bar fixed dense flat color="">
	      <v-toolbar-title><span id="title-name">English - Fighter</span></v-toolbar-title>
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

		<br>
		<br>
 		<v-lazy v-model='isActive' :options="{ threshold: .5 }"
 		 min-height="200" transition="fade-transition">

		<div>
			<vs-row vs-justify='space-around'>

				<div class="levels" v-for="x in levels_" :key=x.id>

						<v-chip color="" text-color="white">

						<v-icon @click="favorite(x)" :color="x.favorite ? '#E91E63' : 'white'" left>
								mdi-heart
							</v-icon>


							<router-link :to="{ name: 'start_level', params: {slug: x.slug, name: x.name } }">
								<span class="name-levels" :class="{ 'name-black-levels': profile.theme }">{{ x.name }}</span>
							</router-link>



<!-- 							<v-icon @click="favorite(x)" color="#BBDEFB" right>
								info
							</v-icon>

 -->						
					</v-chip>

				</div>
				
			</vs-row>
		</div>

		</v-lazy>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Header from '../commons/Header'
	export default {
		name: 'Index',
		data() {
			return {
				isActive: false,
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
				}
		},
		computed: {
			...mapGetters('youtalk', ['levels', 'userlevels']),
			...mapGetters('auth', ['isAuthenticated']),
			...mapGetters('accounts', ['profile']),

	    newItems() {
	      // if (this.profile.user.is_superuser) {
	      if (this.is_superuser) {
	        return this.items
	      }else{
	        return this.items.slice(1)  
	      }
	    },
			levels_() {
				this.levels.forEach(a => {
					this.userlevels.forEach(b => {
						if (a.id === b.level)	{
							a['favorite'] = b.favorite
							a['userlevel_id'] = b.id
						}
					})
				})	
				return this.levels
			},
		},

		components: {
			'youtalk-header': Header 
		},
		methods: {
	  	sideBar() {
	  		this.sidebar = true
	  	},
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

			favorite(x) {
				let id = x.id 
				let data = {'favorite': !x.favorite}	
				this.$store.dispatch('youtalk/SET_FAVORITE', { id, data })
			},
		},
		watch: {
			profile() {
	      this.$vuetify.theme.dark = this.profile.theme
	      this.is_superuser = this.profile.user.is_superuser
			}
		},
		created() {
	    this.$store.dispatch('youtalk/GET_LEVELS')
			if(this.profile.user == undefined) {
				return []
			}else{
	      this.is_superuser = this.profile.user.is_superuser
			}
		}
	};
</script>

<style scoped>
.heart {
	color: #E91E63;
}
.v-icon {cursor: pointer;}
.levels {
	display: inline-block;
	padding: 12px;
}
.name-levels {
	/*color: white;*/
	/*color: #1B5E20;*/
	/*color: #66BB6A;*/
	color: #212121;


	/*color: #4CAF50;*/
	/*color: #D81B60;*/

}
.name-black-levels {
	color: white;
}

</style>