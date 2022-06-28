import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ScoreModal from '../src/packages/scoreModal/index.js'

Vue.prototype.$scoreModal = ScoreModal
Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
