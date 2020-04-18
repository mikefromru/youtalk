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

		<v-alert v-model="alert" :type="typemessage" dismissible>
			{{ message }}
		</v-alert>

	<v-container fluid>
    <v-row align-center justify="center">
			<v-card flat color="transparent">
				<v-form @submit.prevent="reset">
					<v-row justify="center" align-center>
						<v-toolbar-title dark>Password recovery</v-toolbar-title>
					</v-row>

					<v-card-text>
						<v-text-field color="#757575" outlined v-model="email" label="Email" type="email" required>
						</v-text-field>
						<v-btn dark height="60" color="#E91E63" large type='submit' block>Send</v-btn>
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
	name: 'ResetPassword',
	data() {
		return {
			alert: false,
			email: '',
			typemessage: null,
			message: ''
		}
	},
	methods: {
		goHome() {
			this.$router.push({name: 'index'})
		},
		reset() {
			axios.post('/accounts/reset-password/', {email: this.email})
			.then(response => {
				this.typemessage = 'success'
				this.message = 'We sent a message to your email'
				this.alert = true
			})
			.catch(error => {
				let result = error.response.request.response
				this.typemessage = 'error'
				this.message = 'Something went wrong'
				this.alert = true
			})
		}
	}
};
</script>

<style scoped>
.v-btn { font-size: 18px; }
.v-card	{
	width: 400px;
}
</style>