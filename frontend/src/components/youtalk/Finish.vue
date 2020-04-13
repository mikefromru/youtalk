<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="ml-3 fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card flat color="transparent">
            	<v-toolbar color="transparent" flat>

                <v-row justify="center" align="center">
	                <v-toolbar-title><h1>You Talk</h1></v-toolbar-title>
                </v-row>
              </v-toolbar>
	            <v-card-text>
	            	<v-row justify='center'>
		            	<v-chip label class="ma-2"><v-icon left>language</v-icon></v-chip>
		            	<v-chip label class="ma-2"><span class="pr-1">+</span>{{ speekingTime }}</v-chip>
		            </v-row>
              </v-card-text>
              <v-card-actions>
              	<vs-button :to="{ name: 'index'}" class='vsbutton' color="#880E4F">Next</vs-button>
            	<!-- <v-btn large block :to="{ name: 'index' }" dark color="#880E4F">Next</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Finish',
	data() {
		return {

		}
	},
	computed: {
		...mapGetters('accounts', ['profile']),
		speekingTime() {
			let m = this.profile.seconds / 60
			let q = this.profile.questions
			return q * m + ' minutes'
		}
	}
};
</script>

<style>
.speekingTime {

}
.vsbutton {
	width: 100%;
}
</style>