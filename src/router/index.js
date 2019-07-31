import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const routes = [
	
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name:'manage'
	}
]

export default new Router({
	mode:'history',
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
