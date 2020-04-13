<template>
	<div>

    <!-- class="headline grey lighten-2" -->
		<v-dialog v-model="dialog_q" width="500">
			<v-card>
        <v-card-title
          class="title lighten-2"
          primary-title
        >
         Number of questions
        </v-card-title>

        <v-card-text>
	  	    <v-radio-group v-model="questions" :mandatory="false">
			      <v-radio color="#AD1457" class="q-m" label="3 questions" value="3"></v-radio>
			      <v-radio color="#AD1457" class="q-m" label="5 questions" value="5"></v-radio>
			      <v-radio color="#AD1457" class="q-m" label="7 questions" value="7"></v-radio>
			      <v-radio color="#AD1457" class="q-m" label="10 questions" value="10"></v-radio>
			    </v-radio-group>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="#AD1457" @click="change('questions', questions)">Save</v-btn>
          <v-btn color="" text @click="dialog_q = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
		</v-dialog>


		<v-dialog v-model="dialog_m" width="500">
			<v-card>
        <v-card-title
          class="title lighten-2"
          primary-title
        >
         Number of minutes 
        </v-card-title>

        <v-card-text>
	  	    <v-radio-group v-model="minutes" :mandatory="false">
			      <v-radio color="#AD1457" class="q-m" label="1 minutes" value="1"></v-radio>
			      <v-radio color="#AD1457" class="q-m" label="2 minutes" value="2"></v-radio>
			      <v-radio color="#AD1457" class="q-m" label="3 minutes" value="3"></v-radio>
			      <v-radio color="#AD1457" class="q-m" label="5 minutes" value="5"></v-radio>
			    </v-radio-group>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="#AD1457" @click="change('minutes', minutes)">Save</v-btn>
          <v-btn color="" text @click="dialog_m = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
		</v-dialog>

		<v-app-bar flat fixed>
				<router-link :to="{ name: 'index' }">
					<v-icon class='pr-5' large>keyboard_backspace</v-icon>
				</router-link>
 				<v-toolbar-title>Settings</v-toolbar-title>
		</v-app-bar>
		
		<br>
		<br>
		<br>

		<v-container>
			<v-card flat color="transparent">
			<v-row @click="dialog_q = true">
				<v-col class="col-8">
					<span style="cursor: pointer">Number of questions</span>
				</v-col>
				<v-col class="col-4">
					<p style="cursor: pointer" class="text-center">{{ profile.questions }}</p>
				</v-col>
			</v-row>
		<br>
			<v-row @click="dialog_m = true">
				<v-col class="col-8">
					<span style="cursor: pointer">Number of minuts</span>
				</v-col>
				<v-col class="col-4">
					<p style="cursor: pointer" class="text-center">{{ profile.seconds / 60 }}</p>
				</v-col>
			</v-row>
		<br>
			<v-row>
				<v-col class="col-8">
					<span>Turn on / off dark theme</span>
				</v-col>
					<v-spacer></v-spacer>
				<v-col class="col-4">
					<vs-checkbox color="#AD1457" @change="change('theme')" v-model="theme"></vs-checkbox>
				</v-col>
			</v-row>

		<br>

			<v-row>
				<v-col class="col-8">
					<span>Press the button each time before answering or disable this feature</span>
				</v-col>
					<v-spacer></v-spacer>
				<v-col class="col-4">
					<vs-checkbox color="#AD1457" @change="change('startbtn')" v-model="startbtn"></vs-checkbox>
				</v-col>
			</v-row>

		<br>

			<v-row>
				<v-col class="col-8">
					<span>Provide a warning about the end</span>
				</v-col>
					<v-spacer></v-spacer>
				<v-col class="col-4">
					<vs-checkbox color="#AD1457" @change="change('short_sound')" v-model="short_sound"></vs-checkbox>
				</v-col>
			</v-row>

		<br>

			<v-row>
				<v-col class="col-8">
					<span>Turn on / off a voice</span>
				</v-col>
					<v-spacer></v-spacer>
				<v-col class="col-4">
					<vs-checkbox color="#AD1457" @change="change('voice')" v-model="voice"></vs-checkbox>
				</v-col>
			</v-row>
			

			</v-card>
		</v-container>	

	</div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: "Settings",
	data() {
		return {
			show: false,
			dialog_q: false,
			dialog_m: false,

			questions: null,
			minutes: null,
			startbtn: null,
			theme: null,
			short_sound: null,
			voice: null
		}
	},
	computed: {
		...mapGetters('accounts', ['profile']),
	},
	methods: {
		changeTMP() {
			console.log('hello world')
		},
		change(a, b) {
			this.dialog_q = false
			this.dialog_m = false
			console.log(a, b, "<< radios >>")
			if (a === 'questions') {
				var data = {'questions': b}
			}else if(a === 'minutes') {
				var data = {'seconds': b * 60}
			}else if (a === 'startbtn') {
				var data = {'startbtn': !this.profile.startbtn}
			}else if (a === 'theme') {
				var data = {'theme': !this.profile.theme}
			}else if (a === 'short_sound') {
				var data = {'short_sound': !this.profile.short_sound}
			}else if (a === 'voice') {
				var data = {'voice': !this.profile.voice}
			}
			this.$store.dispatch('accounts/CHANGE_SETTINGS', {data} )
		},
	},
	mounted() {
		this.show = true
		this.questions = String(this.profile.questions)
		this.minutes = String(this.profile.seconds / 60)
		this.startbtn = this.profile.startbtn
		this.theme = this.profile.theme
		this.short_sound = this.profile.short_sound
	},
	watch: {
		profile() {
	    this.$vuetify.theme.dark = this.profile.theme
	    
		}
	}
};
</script>

<style>
.q-m {
	padding-bottom: 10px;
	color: red;
}
</style>
