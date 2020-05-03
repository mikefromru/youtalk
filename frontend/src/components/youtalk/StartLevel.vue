<template>
	<div>

		<v-app-bar flat fixed>
		<transition name='fade'>
	  	<v-row v-if="show">
	  		<a @click="$router.go(-1)">
					<v-icon class='pr-5' large>keyboard_backspace</v-icon>
				</a>
				<!-- <v-icon class='pr-5' large @click="goHome()">keyboard_backspace</v-icon> -->

				<v-toolbar-title><span :style="{fontSize: level_name.length > 25 ? '10pt': '12pt'}">{{ level_name }}</span></v-toolbar-title>

    	</v-row>
		</transition>
		</v-app-bar>
		
		<br>
		<br>


		<transition name='fade'>
		<v-container v-if="show">
			<v-card flat color="transparent">
				<v-card-title>Today's questions</v-card-title>
				<v-card-text>
					<div v-for="x, index in level_questions" :key='x.id'>
						<div><span class="index pr-5">{{ ++index }}</span><span class="questions">{{ x.name }} ?</span></div>
						<br>
					</div>
				</v-card-text>
				<v-card-actions>
					<!-- <v-btn @click='goToLevel' id="start-btn" block dark large color="#C2185B">start</v-btn> -->
					<v-btn @click='goToLevel' id="start-btn" block dark large color="#E91E63">start</v-btn>
				</v-card-actions>
			</v-card>
		</v-container>
	</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
	name: 'StartBtn',
	data() {
		return {
			show: false,
		}
	},
	computed: {
		...mapGetters('youtalk', ['level_questions']),
		...mapGetters('accounts', ['profile']),
		level_name() {
			if(this.$route.params.name) {
				return this.$route.params.name
			}else{
				return this.level_questions[0].level.name
			}
		},

	},
	methods: {
		goToLevel() {
			this.$router.push({name: 'questions'})
		},
		goHome() {
			this.$router.push({name: 'index'})
		}
	},
	mounted() {
		this.show = true
	},
	created() {
		let data = {'slug': this.$route.params.slug, 'q': this.profile.questions}
		this.$store.dispatch('youtalk/GET_QUESTIONS', data)
	}
};

</script>

<style>
#start-btn {
	font-size: 18px;
}


.index {
	font-size: 18px;
	/*color: #880E4F;*/
	color: #AD1457;
}
.questions {
	font-size: 18px;
}
</style>



