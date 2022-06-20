import fs from 'fs'
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
import postcss from 'rollup-plugin-postcss'
import {
  terser
} from 'rollup-plugin-terser'

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie')

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config')
  .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1]

const argv = minimist(process.argv.slice(2))

const projectRoot = path.resolve(__dirname, '..')

const env = process.env.NODE_ENV

const baseConfig = {
  input: './src/packages/index.js',
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
    postVue: [
      postcss({
        extensions: ['.css', '.scss'],
        extract: 'index.css'
      }),
      resolve({
        extensions: ['.vue', '.js', '.jsx']
      }),
      commonjs()
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
}
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
]
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
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
      replace(baseConfig.plugins.replace),
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
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
      }),
      terser()
    ]
  }
  buildFormats.push(esConfig)
  console.log(buildFormats.plugins)
}
// cjs
if (!argv.format || argv.format === 'cjs') {
  console.log('cjs')
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
      exports: 'auto',
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      terser()
    ]
  }
  buildFormats.push(unpkgConfig)
}
export default buildFormats
