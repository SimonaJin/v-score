/* eslint-disable */
import { App } from 'vue'

import './main.scss'   // 引入样式
import Modal from './modal/index'

const components = [
	Modal
]
// 全局注册
const install = (app: App) => {
	components.forEach(component => {
		app.component(component.name, component)
	});
}

// 局部注册
export {
	Modal,
	install
}
export default {
	install
}