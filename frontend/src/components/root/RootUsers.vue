<template>
	<div>
		<br>
		<br>
		<br>

		<v-row justify="center">
	    <v-dialog v-model="dialog" fullscreen>
	      <v-card>
	        <v-card-title>
	          <span class="headline">User Profile For Root</span>
	        </v-card-title>
	        <v-card-text>
	          <v-container>
              <p v-if="profile.user">id: <span class="dataP">{{ profile.user.id }}</span></p>
              <p v-if="profile.user">Username: <span class="dataP">{{ profile.user.username }}</span></p>
              <p v-if="profile.user">Email: <span class="dataP">{{ profile.user.email }}</span></p>
              <p v-if="profile.user">First Name: <span class="dataP">{{ profile.user.first_name }}</span></p>
              <p v-if="profile.user">Last Name: <span class="dataP">{{ profile.user.last_name }}</span></p>
              <p>Questions: <span class="dataP">{{ profile.questions }}</span></p>
              <p>Minutes: <span class="dataP">{{ profile.seconds / 60 }}</span></p>
              <p>Time Speak: <span class="dataP">{{ profile.time_speak }}</span></p>
              <p>Short Sound: <span class="dataP">{{ profile.short_sound }}</span></p>
              <p>Start Button: <span class="dataP">{{ profile.startbtn }}</span></p>
              <p>Voice: <span class="dataP">{{ profile.voice }}</span></p>
	          </v-container>
	        </v-card-text>
	        <v-card-actions>
	        	<v-row justify="center">
		          <v-btn large @click="dialog = false">Close</v-btn>
		        </v-row>
	        </v-card-actions>
	      </v-card>
	    </v-dialog>
	  </v-row>

	  <v-card>
	    <v-card-title>
	      Users << {{ profiles.length }} >>
	      <v-spacer></v-spacer>
	      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" 
		      single-line 
		      hide-details>
	      </v-text-field>
	    </v-card-title>
	    <v-data-table @click:row="openDialog" :headers="headers" :items="profiles" :search="search"></v-data-table>
  </v-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
	name: 'RootUser',
	data: () => ({
		dialog: false,
		name: '',
		id: null,
		profiles: [],
		profile: {},
		search: '',
		headers: [
		  {text: 'id', value: 'id'},
		  {text: 'username', value: 'user.username'},
			{text: 'email', value: 'user.email'}
		]
	}),
	methods: {
		get_profile() {
			axios.get('/root/profile/' + this.id + '/')
			.then(response => {
				this.profile = response.data
				console.log(response.user)
			})
		},
		get_profiles() {
			axios.get('/root/profile/')
			.then(response => {
				this.profiles = response.data
			})
			.catch(error => {
				console.log(error)
			})
		},
		openDialog(value) {
			this.name = value.name
			this.id = value.id
			this.dialog = true
			this.get_profile()
		},
	},
	created() {
		this.get_profiles()
	},
};
</script>

<style>
.dataP {
	font-size: 18px;
}
</style>