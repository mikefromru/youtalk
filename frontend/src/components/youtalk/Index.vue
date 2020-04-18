<template>
	<div>
		
		<div v-if="isAuthenticated">
			<youtalk-levels />
		</div>
		
		<div v-else>
			<youtalk-main />
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Levels from '../youtalk/Levels'
import Main from '../youtalk/Main'

	export default {
		name: 'Index',
		components: {
			'youtalk-levels': Levels,
			'youtalk-main': Main,
		},

		computed: {
			...mapGetters('auth', ['isAuthenticated']),
			...mapGetters('accounts', ['profile'])
		},
	};
</script>
