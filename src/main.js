import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/icon.css'
Vue.config.productionTip = false;
Vue.use(BootstrapVue)


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
