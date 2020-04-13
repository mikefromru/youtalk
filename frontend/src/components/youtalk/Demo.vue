<template>
	  <div>

	    <v-app>
	      <v-content>

	      <div class="text-center">

	      	<div v-if="doit === undefined">
		    	  <v-progress-circular :size="50" indeterminate></v-progress-circular>
		    	</div>

				</div>

	      	<p>I am Demo.vue</p>
	        <v-btn @click="doit = undefined">start</v-btn>
	        <v-btn @click="stop">stop</v-btn>
	      </v-content>
	    </v-app>

  </div>
</template>

<script>
	export default {
		name: 'Demo',
		data(){
			return {
				doit: undefined,
			}
		},
		methods: {
			stop() {
				this.doit = 'yes'
			}
		},
		created() {
			console.log(this.doit)
		}
	};
</script>