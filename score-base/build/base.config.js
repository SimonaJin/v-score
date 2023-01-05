import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import path from 'path'
import alias from '@rollup/plugin-alias'
import image from '@rollup/plugin-image';

import postcss from 'rollup-plugin-postcss'
import nodePolyfills from 'rollup-plugin-polyfill-node';
import autoprefixer from "autoprefixer";
import {
	terser
} from 'rollup-plugin-terser'
import injectProcessEnv from 'rollup-plugin-inject-process-env';
const projectRoot = path.resolve(__dirname, '..')
const env = process.env.NODE_ENV;

export const baseConfig = {
	input: './src/packages/index.js',
	plugins: {
		preVue: [
			alias({
				entries: [{
					find: '@',
					replacement: `${path.resolve(projectRoot, 'src')}`
				}, {
					find: '@utils',
					replacement: `${path.resolve(projectRoot, 'src/utils')}`
				}, {
					find: '@css',
					replacement: `${path.resolve(projectRoot, 'src/common/css')}`
				}, {
					find: '@comp',
					replacement: `${path.resolve(projectRoot, 'src/packages/components')}`
				}, {
					find: '@svg',
					replacement: `${path.resolve(projectRoot, 'src/icon')}`
				}],
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
		postVue: [
			json({
				// 默认情况下将解析所有JSON文件,
				// 但您可以专门包含/排除文件
				include: 'node_modules/**',
				exclude: ['node_modules/foo/**', 'node_modules/bar/**'],
				// 对于 tree-shaking, 属性将声明为
				// 变量, 使用 `var` 或者 `const`
				preferConst: true, // 默认是 false
				// 为生成的默认导出指定缩进 —
				// 默认为 't'
				indent: '  ',
				// 忽略缩进并生成最小的代码
				compact: true, // 默认是 false
				// 为JSON对象的每个属性生成一个命名导出
				namedExports: true // 默认是 true
			}),
			image(),
			resolve({
				extensions: ['.vue', '.js', '.jsx'],
				preferBuiltins: false
			}),
			postcss({
				// 抽取单文件到 ./dist/css 文件夹下
				extract: resolve(`dist/style.css`),
				plugins:[autoprefixer]
			}),
			
		],
		commonjs:commonjs(),
		provessEnv:injectProcessEnv({
			NODE_ENV:'production',
			VUE_APP_API_BASE_URL:'/score'
		}),
		babel: {
			exclude: 'node_modules/**',
			extensions: ['.js', '.jsx', '.vue'],
			babelHelpers: 'bundled'
		},
		nodePolyfills: nodePolyfills(),
		terser: terser()
	}
}
export const external = [
	// list external dependencies, exactly the way it is written in the import statement.
	// eg. 'jquery'
]
export const globals = {
	// Provide global variable names to replace your external imports
	// eg. jquery: '$'
}