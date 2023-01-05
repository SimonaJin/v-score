import path from 'path'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
// 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
// import scss from 'rollup-plugin-scss'
import minimist from 'minimist'
import {
	terser
} from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
// 开启 ts 的类型声明文件打包
const overrides = {
	compilerOptions: {
		declaration: true
	},
	exclude: ['src/main.ts', 'node_modules', 'src/App.vue','play']
}
// Get browserslist config and remove ie from es build targets
// Extract babel preset-env config, to combine with esbrowserslist
const argv = minimist(process.argv.slice(2))

const projectRoot = path.resolve(__dirname, '..')

const env = process.env.NODE_ENV
const external = [
	// list external dependencies, exactly the way it is written in the import statement.
	// eg. 'jquery'
]
const globals = {
	// Provide global variable names to replace your external imports
	// eg. jquery: '$'
}
const baseConfig = {
	input: './src/packages/index.ts',
	plugins: {
		preVue: [
			alias({
				entries: [{
					find: '@',
					replacement: `${path.resolve(projectRoot, 'src')}`
				}]
			})
		],
		replace: {
			'process.env.NODE_ENV': JSON.stringify(env),
			preventAssignment: true
		},
		vue: {
			css: true,
			template: {
				isProduction: true
			}
		},
		resolve:resolve({
			extensions: ['.vue', '.js', '.jsx', 'ts', 'tsx']
		}),
		typescript:typescript({
			tsconfigOverride: overrides
		}),
		postVue: [
		],
		babel: {
			exclude: 'node_modules/**',
			extensions: ['.js', '.jsx', '.vue', 'ts', 'tsx'],
			babelHelpers: 'bundled'
		}
	}
}

const buildFormats = []
// 判断不同打包模式
// es
if (!argv.format || argv.format === 'es') {
	console.log('es')
	const esConfig = {
		...baseConfig,
		external,
		output: {
			file: 'dist/v-score-ui.esm.js',
			format: 'esm',
			exports: 'named',
			sourcemap: false
		},
		plugins: [
			baseConfig.plugins.resolve,
			vue(baseConfig.plugins.vue),
			baseConfig.plugins.typescript,
			replace(baseConfig.plugins.replace),
			...baseConfig.plugins.postVue,
			babel({
				...baseConfig.plugins.babel
			}),
			commonjs(),
			terser()
		]
	}
	buildFormats.push(esConfig)
}
// umd
if (!argv.format || argv.format === 'umd') {
	console.log('umd')
	const umdConfig = {
		...baseConfig,
		external,
		output: {
			file: 'dist/v-score-ui.umd.js',
			format: 'umd',
			name: 'Vscore',
			exports: 'auto',
			globals
		},
		plugins: [

			baseConfig.plugins.resolve,
			vue({
				...baseConfig.plugins.vue,
				template: {
					...baseConfig.plugins.vue.template,
					optimizeSSR: true
				}
			}),
			baseConfig.plugins.typescript,
			replace(baseConfig.plugins.replace),
			...baseConfig.plugins.postVue,
			babel(baseConfig.plugins.babel),
			commonjs(),
			terser()
		]
	}
	console.log(umdConfig)
	buildFormats.push(umdConfig)
}
// iife
if (!argv.format || argv.format === 'iife') {
	console.log('iife')
	const unpkgConfig = {
		...baseConfig,
		external,
		output: {
			compact: true,
			file: 'dist/v-score-ui.min.js',
			format: 'iife',
			name: 'Vscore',
			exports: 'named',
			globals
		},
		plugins: [
			baseConfig.plugins.resolve,
			vue(baseConfig.plugins.vue),
			baseConfig.plugins.typescript,
			...baseConfig.plugins.preVue,
			replace(baseConfig.plugins.replace),
			...baseConfig.plugins.postVue,
			babel(baseConfig.plugins.babel),
			commonjs(),
			terser()
		]
	}
	buildFormats.push(unpkgConfig)
}
export default buildFormats