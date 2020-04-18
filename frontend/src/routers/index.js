import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import store from '../store/index'
import store from '../store/modules/auth'

// accounts
import Settings from '../components/accounts/Settings'

//root
import Root from '../components/root/Root'
import RootLevels from '../components/root/RootLevels'
import RootUsers from '../components/root/RootUsers'
import RootLevelDetail from '../components/root/RootLevelDetail'
import RootFeedbacks from '../components/root/RootFeedbacks'

// auth
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ResetPassword from '../components/auth/ResetPassword'
import ResetPasswordConfirm from '../components/auth/ResetPasswordConfirm'

// youtalk
import Levels from '../components/youtalk/Levels'
import Questions from '../components/youtalk/Questions'
import Index from '../components/youtalk/Index'
import StartLevel from '../components/youtalk/StartLevel'
import Finish from '../components/youtalk/Finish'
import Favorite from '../components/youtalk/Favorite'
import Feedback from '../components/youtalk/Feedback'
import Demo from '../components/youtalk/Demo'



import PageNotFound from '../components/commons/PageNotFound'

const ifAuthenticated = (to, from, next) => {
	if (store.getters.isAuthenticated) {
		console.log(store.getters.isAuthenticated, ' I am from ifAuthenticated')
	// if(store.getters.authStatus) {
		next()
		return
	}
	next('/login')
}

const ifNotAuthenticated = (to, from, next) => {
	if (!store.getters.isAuthenticated) {
		console.log(store.getters.isAuthenticated, ' I am from ifNotAuthenticated')
	// if(!store.getters.authStatus || store.getters.authStatus === 'error') {
		next()
		return
	}
	next({name: 'index'})
}

const routes = [
	// root
	{ path: '/root/', component: Root, name: 'root',
		children: [
			{ path: '/root-levels/', component: RootLevels, name: 'root_levels' },
			{ path: '/root/users', component: RootUsers, name: 'root_users' },
			{ path: '/root/level/detail/:id?/', component: RootLevelDetail, name: 'root_level_detail' },
			{ path: '/root-feedbacks/', component: RootFeedbacks, name: 'root_feedbacks' },
		]
	},

	// accounts
	{ path: '/settings/', component: Settings, name: 'settings' },

	// { path: '/login/', component: Login, name: 'login', beforeEnter: ifNotAuthenticated },
	{ path: '/login/', component: Login, name: 'login' },
	{ path: '/register/', component: Register, name: 'register' },
	{ path: '/reset-password/', component: ResetPassword, name: 'reset_password' },
	{ path: '/reset-password-confirm/:token?/', component: ResetPasswordConfirm, name: 'reset_password_confirm' },


	{ path: '/', component: Index, name: 'index' },
	{ path: '/levels/', component: Levels, name: 'levels' },
	{ path: '/favorite/', component: Favorite, name: 'favorite' },
	{ path: '/feedback/', component: Feedback, name: 'feedback' },
	{ path: '/start/:slug?', component: StartLevel, name: 'start_level' },
	{ path: '/questions/', component: Questions, name: 'questions' },
	{ path: '/end/', component: Finish, name: 'finish' },
	{ path: '/demo/', component: Demo, name: 'demo' },

	{ path: '/*/', component: PageNotFound }

]

export default new Router({
	mode: 'history',
	routes
})
