import {baseConfig,external} from './base.config'
import fs from 'fs'
import vue from 'rollup-plugin-vue'
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import {
	terser
} from 'rollup-plugin-terser'

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const babelPresetEnvConfig = require('../babel.config')
  .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

const esConfig = {
	input:baseConfig.input,
	external,
	output: {
		file: 'dist/v-score-ui.esm.js',
		format: 'esm',
		exports: 'named',
		name:"Vscore",
		sourcemap: false
	},
	plugins: [
		vue(baseConfig.plugins.vue),
		...baseConfig.plugins.postVue,
		baseConfig.plugins.commonjs, //commonjs
		baseConfig.plugins.provessEnv,//配置环境变量转换
		baseConfig.plugins.nodePolyfills,//nodejs
		babel({
			...baseConfig.plugins.babel,
			presets: [
				[
					'@babel/preset-env',
					{
						...babelPresetEnvConfig,
						targets: esbrowserslist
					}
				]
			]
		}),//babel
		replace(baseConfig.plugins.replace),//打包时替换对应字符串
		baseConfig.plugins.terser
	]
}
export default esConfig;