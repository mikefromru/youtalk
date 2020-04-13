<template>
	<div>


    <v-app-bar dense flat color="">
    	<v-row>
				<router-link :to="{ name: 'index' }"><v-icon large>keyboard_backspace</v-icon></router-link>
				<v-toolbar-title class="ml-5">Favorite</v-toolbar-title>
    	</v-row>
    </v-app-bar>

 		<v-lazy v-model='isActive' :options="{ threshold: .5 }"
 		 min-height="200" transition="fade-transition">

		<div>
			<vs-row vs-justify='space-around'>

				<div class="levels" v-for="x in favorite_.filter(x => x.favorite)" :key=x.id>

						<v-chip color="">

							<v-icon @click="favorite(x)" :color="x.favorite ? '#E91E63' : 'white'" left>
								mdi-heart
							</v-icon>

							<!-- <v-icon @click="favorite(x)" :class="{'red--text': x.favorite}" left>mdi-heart</v-icon> -->

								<router-link :to="{ name: 'start_level', params: {slug: x.slug, name: x.name } }">
									<span class="name-levels" :class="{ 'name-black-levels': profile.theme }">
										{{ x.name }}
									</span>
								</router-link>

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
	export default {
		name: 'Index',
		data() {
			return {
				isActive: false,
			}
		},
		computed: {
			...mapGetters('youtalk', ['levels', 'userlevels']),
			...mapGetters('auth', ['isAuthenticated']),
			...mapGetters('accounts', ['profile']),
			favorite_() {
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
		methods: {
			favorite(x) {
				let id = x.id 
				let data = {'favorite': !x.favorite}	
				this.$store.dispatch('youtalk/SET_FAVORITE', { id, data })
			},
		},
		watch: {
			profile() {
	      this.$vuetify.theme.dark = this.profile.theme
			}
		}		

	};
</script>

<style>
.v-icon {cursor: pointer;}
.levels {
	display: inline-block;
	padding: 12px;
}
.name-levels {
	color: #424242;
}
.name-black-levels {
	color: white;
}

</style>