import axios from 'axios'

const state = {
	levels: [],
	userlevels: [],
	questions: [],
	level_questions: []
}

const actions = {
	GET_LEVELS: ({ commit }) => {
		axios.get('/app/')
		.then(response => {
			commit('LEVELS', response.data)
		})
		.catch(error => {
			console.log(error)
		})
	},
	GET_USERLEVELS: ({ commit }) => {
		axios.get('/app/userlevels/')
		.then(response => {
			commit('USERLEVELS', response.data)
		})
		.catch(error => {
			console.log(error)
		})
	},
	SET_FAVORITE: ({commit}, payload) => {
		axios.patch('/app/userlevels/' + payload.id + '/', payload.data)
		.then(response => {
			commit('FAVORITE', response.data)
		})
		.catch(error => {
			console.log(error)
		})
	},
	GET_QUESTIONS: ({ commit }, payload) => {
		axios.get('/app/questions/' + payload.slug + '/')
		.then(response => {
			console.log(payload, '<<< payload >>>')
			function makeRandom(a, b) {
				return Math.random() - 0.5
			}
			let q = response.data.sort(makeRandom).filter(i => i.name.length < 60)
			commit('QUESTIONS', q.slice(0, payload.q))
		})
		.catch(error => {
			console.log(error)
		})
	}
	
}

const mutations = {
	LEVELS: (state, data) => {
		state.levels = data
	},
	USERLEVELS: (state, data) => {
		state.userlevels = data
	},
	FAVORITE: (state, data) => {
		let item = state.userlevels.find(x => x.id == data.id)
		if (item) {
			item.favorite = data.favorite
		}else{ // if item === indefined then add to a state
			state.userlevels.push(data)
		}
	},
	QUESTIONS: (state, data) => {
		state.level_questions = data
	}
}

const getters = {
  levels: state => state.levels,
  userlevels: state => state.userlevels,
  questions: state => state.questions,
  level_questions: state => state.level_questions
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}