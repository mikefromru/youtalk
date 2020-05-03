import axios from 'axios'

const state = {
	questions: [],
	level_name: ''
}

const actions = {
	GET_ROOTLEVELS_QESTIONS: ({ commit }, id) => {
		axios.get('/root/levels-questions/' + id + '/')
		.then(response => {
			commit('QUESTIONS', response.data)
		})
	},
	CHANGE_QESTION: ({ commit }, payload) => {
		axios.patch('/root/questions/' + payload.id + '/', payload.data)
		.then(response => {
			commit('CHANGE', response.data)
		})
	}
}

const mutations = {
	QUESTIONS: (state, data) => {
		state.questions = data
		state.level_name = data[0].level.name
	},
	CHANGE: (state, data) => {
		let item = state.questions.find(x => x.id == data.id)
		item.name = data.name
		item.forbidden = data.forbidden
	}
}

const getters = {
	rootLevelsQuestions: state => state.questions,
	level_name: state => state.level_name
	
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
