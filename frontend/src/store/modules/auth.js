import axios from 'axios'

const state = {
	token: localStorage.getItem('user-token') || '',
	status: null,
	user: {},
	auth_error: {}
}

const actions = {
	AUTH_SOCIAL_FACEBOOK: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      axios.post('/accounts/facebook/', data)
      .then(response => {
        const token = response.data.token
        localStorage.setItem('user-token', token)
        commit('AUTH_SUCCESS', token)
        resolve(reject)
      })
      .catch(error => {
        commit('AUTH_ERROR')
        localStorage.clear()
        reject(error)
      })
    })
  },


  AUTH_SOCIAL_GOOGLE: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      axios.post('/accounts/google/', data)
      .then(response => {
        const token = response.data.token
        localStorage.setItem('user-token', token)
        commit('AUTH_SUCCESS', token)
        resolve(reject)

      })
      .catch(error => {
        commit('AUTH_ERROR')
        localStorage.clear()
        reject(error)
      })
    })
  },


  
  REGISTRATION: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      axios.post('/rest-auth/registration/', data)
      .then(response => {
          const token = response.data.token
          localStorage.setItem('user-token', token)
          commit('AUTH_SUCCESS', token)
          resolve(response)
      })
      .catch(error => {
          commit('AUTH_ERROR', error.response.request.response)
          state.auth_error = error.response.request.response
          localStorage.clear()
          localStorage.removeItem('vuex')
          console.log(error, 'something went wrong')
          reject(error)
      })
    })
  },
	
	AUTH_REQUEST: ({commit, dispatch}, data) => {
		return new Promise((resolve, reject) => {
			commit('AUTH_REQUEST')
			return axios.post('/rest-auth/login/', data)
			.then(response => {
				const token = response.data.token
				localStorage.setItem('user-token', token)
				commit('AUTH_SUCCESS', token)
				resolve(reject)
			})
			.catch(error => {
				commit('AUTH_ERROR', error.response.request.response)
				localStorage.clear()
				reject(error)
			})
		})
	},

  REFRESH_TOKEN: ({commit, dispatch}, data) => {
    axios.post('/rest-auth/refresh_token/', data)
    .then(response => {
      console.log('it is okay in REFRESH_TOKEN')
      const token = response.data.token
      localStorage.setItem('user-token', token)
      commit('AUTH_SUCCESS', token)
    })
    .catch(error => {
      console.log('something went wrong REFRESH_TOKEN')
      localStorage.clear()
      router.push({name: 'index'})
      commit('LOGOUT')
    })
  },
  
  LOGOUT: ({commit}) => {
    localStorage.clear()
    commit('LOGOUT')
  },
}

const mutations = {
	AUTH_REQUEST: (state) => {
		state.status = 'loading...'
	},
	AUTH_ERROR: (state, data) => {
		state.state = 'error'
		state.auth_error = data
	},
	AUTH_SUCCESS: (state, token) => {
		state.state = 'success'
		state.token = token
	},
	LOGOUT: (state) => {
		state.token = '',
		state.status = null
	}
}

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status,
	user: state => state.user	
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
}
