<template>
	<div>
    <v-content>
      <v-container fluid>
      <v-row>
        	<div v-for="x in levels" :key="x.id">
        		<div class="name">
        			<li>
		        		<router-link :to="{ name: 'root_level_detail', params: { id: x.id } }">{{ x.name }}</router-link>
		        	</li>
		        </div>
	        </div>
        </v-row>
      </v-container>
    </v-content>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'RootLevels',
	computed: {
		...mapGetters('youtalk', ['levels'])
	}

};
</script>

<style scoped>
.name {
	padding: 10px;
}

</style>


