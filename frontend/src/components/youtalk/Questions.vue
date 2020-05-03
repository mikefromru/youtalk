 <template>

 	<div>
    <v-app-bar fixed dense flat color="">
    	<v-row justify="space-between">
				<v-icon large @click="goHome()">close</v-icon>
				<div class="pt-1">{{ level_name }}</div>
			  <div class="pt-1 pr-1 countQuestions">{{ numberOFquestion }}/{{ level_questions.length }}</div>
    	</v-row>
    </v-app-bar>

		<br>
		<br>
		<br>
		
		<!-- <v-btn @click.prevent="short_sound">sound</v-btn> -->

  	<v-card flat color="transparent">
  		<v-card-title>Answer this question</v-card-title>
  		<v-card-subtitle>
				Try to tell about this questin as much as posible and clearly
  		</v-card-subtitle>
		</v-card>
		<br>
		<v-card outlined height='300'>
			<v-card-text class="flex" column>
				<v-icon class='icon-play pb-2' @click='play' large color="#880E4F">volume_up</v-icon>
				<span class="question-name">{{ question}} ?</span>
				<br>
  		</v-card-text>
		</v-card>
		<br>

		<div v-if="profile.startbtn">	
			<v-row justify='center'>
				<v-btn width='100' dark color="#880E4F" @click="startbtn" v-if="showStartBtn">Let's go!</v-btn>
			</v-row>
			<div v-if="showAfterStartBtn">
				<v-row justify="center">
					<transition name='fade'>
						<div v-if='anime' @click="pause">
							<span class="timer" :class="{timerPause: !pauseValue}">{{ formatTimer }}</span>
						</div>
					</transition>
				</v-row>
			</div>
		</div>

	  <div v-else>
			<v-row justify="center">
				<transition name='fade'>
					<div v-if='anime' @click="pause">
						<span class="timer" :class="{timerPause: !pauseValue}">{{ formatTimer }}</span>
					</div>
				</transition>
			</v-row>

		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
	name: 'Questions',
	props: ['name'],
	data() {
		return {
			i: 0,
			numberOFquestion: 1,
			timeValue: null,
			timer: null,
			progress_persent: 100, 
			popupActivo4: false,
			pauseValue: true,
			anime: false,
			btnStart: true,

			// showTimer: true,
			showStartBtn: true,
			showAfterStartBtn: false
		}
	},
	computed: {
		...mapGetters('youtalk', ['level_name', 'level_questions']),
		...mapGetters('accounts', ['profile']),
		question() {
			return this.level_questions[this.i].name
		},
		level_name() {
			let span = this.level_questions[0].level.name
			if (span.length > 30) {
				let bar = span.split(' ').slice(0, 3)
				return bar.join(' ') + ' ...'
			}else{
				return span
			}
		},
		formatTimer() {
			var seconds = this.timeValue
			var options = {
				minute: 'numeric', 
			  second: 'numeric'
			};
			return new Intl.DateTimeFormat(undefined, options).format((new Date(0, 0, 0, 0, 0, seconds)));
		}

	},
	methods: {
		startLevel() {
			this.btnStart = false
			this.start_timer()
			this.anime = false
			var self = this
			setTimeout(function() {
				self.anime = true
			}, 1000);
		},
    showAllquestions() {
    	this.popupActivo4 = true
    	this.timeValue = 10
    },
    pause() {
    	this.pauseValue = !this.pauseValue
    },
		play() {

			this.timeValue = this.profile.seconds
			this.voice()
			this.progress_persent = 0
			var self = this
			setTimeout(function() {
				self.progress_persent = 100
			}, 1000);

		},
		start_timer() {
			this.timer = setInterval(() => {this.timeValue--}, 1000)
		},
		stop_timer() {
			clearTimeout(this.timer)
		},
		get_next_question() {
			if (this.profile.startbtn) {
				// this.stop_timer()
				this.showStartBtn = true
				this.showAfterStartBtn = false
	    	this.anime = true
			}else{
				var self = this
				setTimeout(function() {
		    	self.anime = true
					self.start_timer()
				}, 4000)
			}

			this.i += 1
			if (this.i === this.level_questions.length) {
				let m = this.profile.seconds / 60
				let q = this.profile.questions				
				let result = m * q
				let total = this.profile.time_speak + result
				let data = {'time_speak': total}
				this.$store.dispatch('accounts/CHANGE_SETTINGS', { data } )
				this.$router.push({name: 'finish'})
			}else{
				this.progress_persent = 100
				this.numberOFquestion += 1
				this.timeValue = this.profile.seconds
				this.voice()
			}
		},
		goHome() {
			// this.$router.push({name: 'start_level', params: {name: this.level_questions[0].level.name, slug: this.level_questions[0].level.slug}})
			this.$router.push({name: 'index'})
			
      responsiveVoice.cancel();      
		},
		voice() {
			if (this.profile.voice) {
				responsiveVoice.speak(this.question, "US English Male", {rate: 0.8})
			}
		},
		short_sound() {
			if (this.profile.short_sound) {
				var audio = new Audio('static/short_sound.mp3')
				audio.play()
			}

    },
    startbtn() {
			this.start_timer()
    	this.showStartBtn = false
    	this.showAfterStartBtn = true
    },

	},
	mounted() {
		this.voice()
		this.timeValue = this.profile.seconds
		if (this.profile.startbtn === true) {
			this.showStartBtn = true
			this.anime = true
		}else{
			var self = this
			setTimeout(function() {
				self.anime = true
				self.start_timer()
			}, 4000)
		}

	},
	destroyed() {
		this.stop_timer()
	},
	watch: {
		pauseValue() {
			if (this.pauseValue === true) {
				this.start_timer()
			}else{
				this.stop_timer()
			}
		},

		timeValue(time) {
			if (time === 0) {
				this.progress_persent = 0
				this.anime = false
			}
			if (time === 3) { // turn on/off short sound
				this.short_sound()
			}
			if (time === -1) {
				this.stop_timer()
				this.get_next_question()
			}
		},
		popupActivo4() {
			if (this.popupActivo4 === true) {
				this.stop_timer()
			}else{
				this.start_timer()
			}
		}

	}
};
</script>

<style scoped>
.question-name {
	font-size: 20px;
}
/*.fade-enter-active, .fade-leave-active {*/
.fade-enter-active {
  transition: opacity 5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.time-card {
}
.questions-popup {
	font-family: 'Arial';
	font-size: 16px;
	color: gray;
}
.timer {
	/*color: #46C93A;*/
	/*color: #5B3CC4;*/

	color: #880E4F;
	font-weight: bold;
	font-size: 30px;
	cursor: pointer;
}
.countQuestions {
	/*color: #5B3CC4;*/
	color: #880E4F;
	font-size: 20px;
	font-weight: bold;
}
.mycard {
	height: 200px;
}
.vs-icon {cursor: pointer}
.mynavbar {}
.footer {
	position: absolute;
	bottom: 10px;
	width: 100%;
	height: 40px;
}




.timerPause {
	cursor: pointer;
	
  -webkit-animation: timerPause 3s linear infinite;
  animation: timerPause 3s linear infinite;
}
@-webkit-keyframes timerPause {
  /*0% { color: rgba(34, 34, 34, 1); }*/
  /*50% { color: rgba(34, 34, 34, 0); }*/
  100% { color: rgba(34, 34, 34, 1); }
}
@keyframes timerPause {
  /*0% { color: rgba(34, 34, 34, 1); }*/
  /*50% { color: rgba(34, 34, 34, 0); }*/
  100% { color: rgba(34, 34, 34, 1); }
}


</style>