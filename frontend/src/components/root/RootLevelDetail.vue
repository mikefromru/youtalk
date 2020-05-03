<template>
	<div>
		<br>
		<br>
		<br>


    <v-dialog
      v-model="dialog_add"
      width="500"
    >

      <v-card>
        <v-card-title
          class=""
          primary-title
          dark
        >
          Add new question
        </v-card-title>

        <v-card-text>
        	<v-textarea auto-grow v-model="name"></v-textarea> 
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#C2185B" outlined @click="add">Add</v-btn>
          <v-btn color="" text @click="dialog_add = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title
          class=""
          primary-title
          dark
        >
          Edit:
        </v-card-title>

        <v-card-text>
        	<v-textarea auto-grow v-model="name"></v-textarea> 
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="error" outlined @click="remove">delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#C2185B" outlined @click="save">Save</v-btn>
          <v-btn color="" text @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

		  <v-simple-table>
		  	<template v-slot:default>
		  		<thead>
		  			<tr>
		  				<th class="text-left">{{  rootLevelsQuestions.length }}</th>
		  				<th class="text-left">{{ level_name }}</th>
		  				<th class="text-left">Boolean</th>
		  			</tr>
		  		</thead> 
		  		<tbody>
		  			<tr v-for="(x, index) in rootLevelsQuestions" :key="x.id">
		  				<td>{{ ++index }}</td>
		  				<td @click="openDialog(x)">{{ x.name }}</td>
		  				<td @click="change(x)">{{ x.forbidden }}</td>
		  			</tr>
		  		</tbody>
		  	</template>
		  </v-simple-table>
		  <v-row class='justify-center pt-4'>
			  <v-btn large outlined width='150' color='#E91E63' @click="dialog_add = true">
			  	<v-icon>add</v-icon>
			  </v-btn>
			</v-row>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
	name: 'RootLevelDetail',
	data: () => ({
		dialog_add: false,
		dialog: false,
		name: '',
		id: null
	}),
	computed: {
		...mapGetters('root', ['level_name', 'rootLevelsQuestions'])
	},
	methods: {
		add() {
			var id = this.$route.params.id
		  axios.post('/root/add-question/', {'id': id, 'name': this.name} )
      .then(response => {
      	this.name = ''
      	this.dialog_add = false
	      this.get_rootlevels_questions()
      })
      .catch(error => {
      	console.log(error)
      })

		},
		remove() {
      axios.delete('/root/questions/' + this.id + '/')
      .then(response => {
      	this.dialog = false
	      this.get_rootlevels_questions()
      })
		},
		change(a) {
			console.log(a.id, '<<<< a.id')
			let data = {'forbidden': !a.forbidden}
			let id = a.id
			this.$store.dispatch('root/CHANGE_QESTION', {id, data})
		},
		save() {
			let data = {'name': this.name}
			let id = this.id
			this.$store.dispatch('root/CHANGE_QESTION', {id, data})
			this.dialog = false
		},
		openDialog(value) {
			this.name = value.name
			this.id = value.id
			this.dialog = true
		},
		get_rootlevels_questions() {
			this.$store.dispatch('root/GET_ROOTLEVELS_QESTIONS', this.$route.params.id)
		}
	},
	created() {
		this.get_rootlevels_questions()
	},
};
</script>