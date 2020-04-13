<template>
  <div>
    <br> 
    <br> 
    <v-row justify-center>
      <v-dialog
        v-model="dialog"
      >
        <v-card>
          <v-card-title class="headline">{{ feedback.title }}</v-card-title>

          <v-card-text>
            {{ feedback.text }}
            <br>
            <div v-for="x in feedback.screenshots" :key="x.id">
              <img :src="x" height="60" alt="picture" />
            </div>
          </v-card-text>

          <v-card-actions>
            {{ profile.user.username }}
            <v-spacer></v-spacer>

            <v-btn
	            text
              color="green darken-1"
              @click="dialog = false"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-row>
    <br>
		<v-simple-table>
	  	<template v-slot:default>
	  		<thead>
	  			<tr>
	  				<th class="text-left">subject</th>
	  				<th class="text-left">screenshot</th>
	  			</tr>
	  		</thead> 
	  		<tbody>
	  			<tr v-for="(x, index) in feedbacks" :key="x.id">
		        <td class="titleX" @click="feedback_detail(x)">
		          <span :class="{'viewed': x.viewed_message}">
		            {{ x.title }}
		          </span>
		        </td>
		        <td>{{ x.screenshots.length }}</td>
		        <td><v-icon @click="remove(x)" color="red">delete_outline</v-icon></td>
	  			</tr>
	  		</tbody>
	  	</template>
	  </v-simple-table>

  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: "RooFeedbacks",
  data() {
    return {
    	singleSelect: false,
      sender_man: '',
      dialog: false,
      feedbacks: [],
      feedback: {},
      selected: [],
      headers: [
        {text: 'Subject', value: 'subject'},
        {text: 'Screenshot', value: 'screenshot'}
      ]
    };
  },
  computed: {
  	...mapGetters('accounts', ['profile'])
  },
  methods: {
    remove(a) {
      axios.delete('/root/feedbacks/' + a.id + '/')
      .then(response => {
        this.get_feedbacks()
      })
    },
    feedback_detail(a) {
      this.dialog = true
      if (a.viewed_message == false) {
        axios.patch('/root/feedbacks/' + a.id + '/', {'viewed_message': true})
        .then(response => {
          let item = this.feedbacks.find(x => x.id == response.data.id)
          item.viewed_message = response.data.viewed_message
        })
      }
      this.feedback = a
    },
    get_feedbacks() {
      axios.get('/root/feedbacks/')
      .then(response => {
        this.feedbacks = response.data
      })
    }
  },
  created() {
    this.get_feedbacks()
  },
};
</script>

<style scoped>
.titleX {cursor: pointer;}
.viewed {
  color: #9b9b9b;
}
.dell {
}
</style>
