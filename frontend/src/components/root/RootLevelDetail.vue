<template>
	<div>
		<br>
		<br>
		<br>
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
		  				<th class="text-left">len</th>
		  			</tr>
		  		</thead> 
		  		<tbody>
		  			<tr v-for="(x, index) in rootLevelsQuestions" :key="x.id">
		  				<td>{{ ++index }}</td>
		  				<td @click="openDialog(x)">
		  					{{ x.name }}
			  			</td>
			  			<td>{{ x.name.length}}</td>
		  			</tr>
		  		</tbody>
		  	</template>
		  </v-simple-table>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
	name: 'RootLevelDetail',
	data: () => ({
		dialog: false,
		name: '',
		id: null
	}),
	computed: {
		...mapGetters('root', ['level_name', 'rootLevelsQuestions'])
	},
	methods: {
		change(a) {
			let data = {'forbidden': a.forbidden}
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
	},
	created() {
		this.$store.dispatch('root/GET_ROOTLEVELS_QESTIONS', this.$route.params.id)
	},
};
</script>