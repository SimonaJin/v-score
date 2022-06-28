import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import path from 'path'
import alias from '@rollup/plugin-alias'
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
export const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
]
export const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
}