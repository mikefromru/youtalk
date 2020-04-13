import axios from 'axios'

const state = {
	profile: {},
}

const actions = {
	GET_SETTINGS: ({ commit }) => {
		axios.get('/accounts/detail/')
		.then(response => {
			commit('SETTINGS', response.data)
		})
		.catch(error => {
			console.log(error)
		})
	},
	CHANGE_SETTINGS: ({ commit }, payload) => {
		axios.patch('/accounts/change/', payload.data)

		.then(response => {
			commit('SETTINGS', response.data)
		})
		.catch(error => {
			console.log(error)
		})
	}
}

const mutations = {
	SETTINGS: (state, data) => {
		state.profile = data
	}
}

const getters = {
	profile: state => state.profile
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
}

