import Alert from './alert/alert.vue'
import initAlert from './alert/index.js'

const install = (Vue) => {
  if (install.installed) return // 判断是否安装
  install.installed = true // 记录安装状态
  // 遍历注册所有组件

  Vue.component('Alert', Alert)
  // 添加全局API
  Vue.prototype.$alert = initAlert
}

// const Alertbox = {
//   install(Vue) {
//     if (typeof window !== 'undefined' && window.Vue) {
//       Vue = window.Vue
//     }
//     Vue.component('Alert', Alert) // 生成一个组件
//     initAlert(Vue)
//   }
// }

// export default Alertbox
export default {
  version: '0.1.0', // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  initAlert
}



