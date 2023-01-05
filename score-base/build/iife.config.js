import {baseConfig,external,globals} from './base.config'
import vue from 'rollup-plugin-vue'
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
const Global = `var process = {
  env: {
    NODE_ENV: 'production'
  }
}`

const unpkgConfig = {
	input:baseConfig.input,
	external,
	output: {
		compact: true,
		file: 'dist/v-score-ui.min.js',
		format: 'iife',
		name: 'Vscore',
		exports: 'named',
		banner: Global,
		globals
	},
	plugins: [
		...baseConfig.plugins.preVue,//代理
		vue(baseConfig.plugins.vue),//vue
		...baseConfig.plugins.postVue,//json-image-resolve-postcss
		baseConfig.plugins.commonjs, //commonjs
		baseConfig.plugins.provessEnv,//配置环境变量转换
		baseConfig.plugins.nodePolyfills,//nodejs
		babel(baseConfig.plugins.babel),//babel
		replace(baseConfig.plugins.replace),//打包时替换对应字符串
		baseConfig.plugins.terser
	]

}

export default unpkgConfig;