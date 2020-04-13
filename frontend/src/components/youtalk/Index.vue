<template>
	<div>
		
		<div v-if="isAuthenticated">
			<youtalk-levels />
		</div>
		
		<div v-else>
			<auth-login />
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Levels from '../youtalk/Levels'
import Login from '../auth/Login'

	export default {
		name: 'Index',
		components: {
			'youtalk-levels': Levels,
			'auth-login': Login,
		},

		computed: {
			...mapGetters('auth', ['isAuthenticated']),
			...mapGetters('accounts', ['profile'])
		},
	};
</script>
