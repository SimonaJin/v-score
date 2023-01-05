import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import ScoreModal from '../src/packages/scoreModal/index.js'
import dayjs from 'dayjs'
import './plugins/elementUI'
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.scss'


// eCharts组件
import eChartFn from '@Acomp/charts/index.js'
import ChartPanel from '@Acomp/charts/index.vue'
Vue.component(ChartPanel.name, ChartPanel)
Vue.prototype.$eChartFn = eChartFn
import '@Aicon' // icon
Vue.prototype.$scoreModal = ScoreModal
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App) 
}).$mount('#app')
