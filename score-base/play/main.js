import Vue from 'vue'
import router from './router'
import App from './App.vue'
import AlertBox from '../src/packages/alert/index.js'

Vue.prototype.$alert = AlertBox
Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
