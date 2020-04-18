<template>
	<div>
		<v-app-bar flat app>
	  	<v-row>
				<v-icon class='pr-5' large @click="goHome()">keyboard_backspace</v-icon>
				<v-toolbar-title><span>English - Fighter</span></v-toolbar-title>
	  	</v-row>
		</v-app-bar>
		<br>
		<br>
		<br>

    <v-alert class="ml-4" v-model="alert" :type="typeMessage" dismissible>
      <span v-for="x in message" :key="x.id">
        <div v-if="typeof x === 'string'">{{ x }}</div>
        <div v-else-if="Array.isArray(x)">{{ x.join() }}</div>
        <div v-else>{{ x }}</div>
      </span>
    </v-alert>

	<v-container fluid>
    <v-row align-center justify="center">
			<v-card flat color="transparent">

				<v-form @submit.prevent="set_new_password">
					<v-row justify="center" align-center>
						<v-toolbar-title dark>Password recovery</v-toolbar-title>
					</v-row>

					<v-card-text>

						<v-text-field 
							outlined 
							v-model="password1" 
							label="New password"
							required
					    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
	            :type="show1 ? 'text' : 'password'"
	            @click:append="show1 = !show1"
	            
						 >
						</v-text-field>

						<v-text-field 
							color="#757575" 
							outlined 
							v-model="password2" 
							label="Confirm password" 
							:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
	            :type="show2 ? 'text' : 'password'"
	            @click:append="show2 = !show2"
	            
						>
						</v-text-field>
						<v-btn height="60" large dark color="#E91E63" type='submit' block>Send</v-btn>

					</v-card-text>

				</v-form>
			</v-card>
		</v-row>
		</v-container>

	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ResetPasswordConfirm',
	data() {
		return {
			show1: false,
			show2: false,
			alert: false,
			typeMessage: null,
			message: '',
			token: '',
			password1: '',
			password2: ''
		}
	},
	methods: {
		goHome() {
			this.$router.push({name: 'login'})
		},
		set_new_password() {
			if (this.password1 === this.password2) {
				axios.post('/accounts/reset-password/confirm/', {'password': this.password1, 'token': this.token})
				.then(response => {
					this.typeMessage = 'success'
					this.message = ['You have just set a new password'] 
					this.alert = true
					this.password1 = ''
					this.password2 = ''
				})
				.catch(error => {
					this.typeMessage = 'error'
					this.message = JSON.parse(error.response.request.response)
					this.alert = true
				})
			}else{
				this.alert = true
				this.typeMessage = 'error'
				this.message = ["Passwords do not match"]
			}

		}
	},
	created() {
		this.token = this.$route.query.token
	}

};
</script>

<style scoped>
.v-btn { font-size: 18px; }
.v-card	{
	width: 400px;
}
</style>