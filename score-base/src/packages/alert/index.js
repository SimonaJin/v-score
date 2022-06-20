// import Vue from 'vue'
// node_modules/vue/dist/vue.runtime.esm
// import Vue from '../../../node_modules/vue/dist/vue.runtime.esm'
import Vue from 'vue'
import Alert from './alert.vue'

// Alert构造函数
const AlertConstructor = Vue.extend(Alert)

// Alert实例池
const AlertPool = []

/** 获取Alert实例（实例池中有从池中取，没有则新建） */
const getInstance = () => {
  if (AlertPool.length > 0) {
    return AlertPool.shift()
  }
  return new AlertConstructor({
    el: document.createElement('div')
  })
}

/** 归还实例到实例池 */
const returnInstance = (instance) => {
  if (instance) {
    AlertPool.push(instance)
    // console.log('归还实例:', instance, AlertPool)
  }
}

/** 文档中移除Alert的DOM节点 */
const removeDom = (event) => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

// 关闭
AlertConstructor.prototype.close = function () {
  this.visible = false // 不可见
  this.closed = true // 关闭状态
  this.$el.addEventListener('transitionend', removeDom) // 动画完成后移除DOM节点
  returnInstance(this) // 实例对象归还到实例池，实例可以重复利用
}

// 显示Alert提示信息
export default function (options = {}) {
  // 显示时间，默认3秒
  // let duration = options.duration || 3000
  const instance = getInstance()
  // console.log('instance=', instance)
  // 显示类型
  instance.type = options.type || 'normal'
  // 显示内容
  instance.message = typeof options === 'string' ? options : options.message
  // 显示位置：top、middle、bottom
  instance.position = options.position || 'middle'
  instance.className = options.className || ''
  // 移除动画完成事件
  instance.$el.removeEventListener('transitionend', removeDom)
  // 点击关闭
  // instance.$on('close', () => {
  //     instance.close()
  // })
  // console.log('instance.$el=', instance.$el)
  // 将节点添加到文档
  document.body.appendChild(instance.$el)
  instance.visible = true
  instance.closed = false
}
