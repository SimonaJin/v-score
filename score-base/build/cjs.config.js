import {baseConfig,external,globals} from './base.config'
import vue from 'rollup-plugin-vue'
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import {
	terser
} from 'rollup-plugin-terser'

const umdConfig = {
	...baseConfig,
	external,
	output: {
		compact: true,
		file: 'dist/v-score-ui.ssr.js',
		format: 'cjs',
		name: 'Vscore',
		exports: 'auto',
		globals
	},
	plugins: [
		replace(baseConfig.plugins.replace),
		...baseConfig.plugins.preVue,
		vue({
			...baseConfig.plugins.vue,
			template: {
				...baseConfig.plugins.vue.template,
				optimizeSSR: true
			}
		}),
		...baseConfig.plugins.postVue,
		babel(baseConfig.plugins.babel),
		terser()
	]
}
export default umdConfig;