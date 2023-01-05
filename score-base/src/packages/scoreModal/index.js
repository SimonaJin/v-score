import Vue from 'vue'
import ScoreModal from './scoreModal.vue'
import * as server from '../../server/index'
import '@css/reset.scss';
import '@svg/index.js';
// Modal构造函数
const ModalConstructor = Vue.extend(ScoreModal)

// Modal实例池
const ModalPool = []

/** 获取Modal实例（实例池中有从池中取，没有则新建） */
const getInstance = () => {
	if (ModalPool.length > 0) {
		return ModalPool.shift()
	}
	return new ModalConstructor({
		el: document.createElement('div')
	})
}

/** 文档中移除Modal的DOM节点 */
const removeDom = (event) => {
	if (event.target.parentNode) {
		event.target.parentNode.removeChild(event.target)
	}
}

// 获取对象
const getScoreParm = async (parmData) => {
	try {
		let result = await server.getScoreParm(parmData);
		return result.data
	} catch (error) {
		return Promise.reject(error)
	}
}
// 获取
// 显示Modal提示信息
export default function (options = {}) {
	// 显示时间，默认3秒
	// let duration = options.duration || 3000
	const instance = getInstance()
	// 1. 发送请求

	let parmData = {
		userId: options.userId,
		userKey: options.userKey
	}
	// 2. 获取对象
	getScoreParm(parmData).then(res => {
		let result = res
		// 3. 数据处理 绑定到实例上
		Object.keys(result).forEach((key) => {
			instance[key]= result[key]
		})
		// 移除动画完成事件
		instance.$el.removeEventListener('transitionend', removeDom)
		//4.将节点添加到文档
		document.body.appendChild(instance.$el)
		instance.visible = true
		instance.closed = false
	});
}