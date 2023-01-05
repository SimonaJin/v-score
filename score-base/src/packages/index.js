import ScoreModal from './scoreModal/scoreModal.vue'
import initModal from './scoreModal/index.js'

const install = (Vue) => {
  if (install.installed) return // 判断是否安装
  install.installed = true // 记录安装状态
  // 遍历注册所有组件

  Vue.component('ScoreModal', ScoreModal)
  // 添加全局API
  Vue.prototype.$alert = initModal
}

export const Modalbox = {
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('ScoreModal', ScoreModal) // 生成一个组件
    initModal(Vue)
  }
}
export const init = initModal;
export default{
  version: '0.1.0', // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  Modalbox
}




