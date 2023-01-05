import {baseConfig,external,globals} from './base.config'
import vue from 'rollup-plugin-vue'
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'


const umdConfig = {
	input:baseConfig.input,
	external,
	output: {
		compact: true,
		file: 'dist/v-score-ui.ssr.js',
		format: 'cjs',
		name: 'Vscore',
		exports: 'named',
		globals
	},
	plugins: [
		
		...baseConfig.plugins.preVue,
		vue({
			...baseConfig.plugins.vue,
			template: {
				...baseConfig.plugins.vue.template,
				optimizeSSR: true
			}
		}),
		...baseConfig.plugins.postVue,
		baseConfig.plugins.commonjs, //commonjs
		baseConfig.plugins.provessEnv,//配置环境变量转换
		baseConfig.plugins.nodePolyfills,//nodejs
		babel(baseConfig.plugins.babel),//babel
		replace(baseConfig.plugins.replace),
		baseConfig.plugins.terser
	]
}
export default umdConfig;