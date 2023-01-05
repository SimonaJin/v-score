# web-score

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 离线安装tar包下载
1.先用命令下载tar包,获取下载压缩包的地址
```
	npm view rollup-plugin-polyfill-node dist.tarball
```
2.离线安装：
- 方法一: wget +下载包url
```
wget https://registry.npmjs.org/rollup-plugin-polyfill-node/-/rollup-plugin-polyfill-node-0.11.0.tgz
```
- 方法二：离线本地按照
```
npm install 相对路径
```

## 文件目录

+ build --  打包配置文件
+ play  --  项目预览
	- public
		- index.html  --  预览index文件
  - router
  	- index.js  --  路由
  - views
		- home.vue
  - app.vue  --  启动挂载文件
  - main.js  --  预览项目
+ src   --  组件代码
  - assets  --  静态资源文件
  - packages  --  组件文件
		- 
    - index.js  --  组件挂载文件
  - server	
    - request.js  --  axios封装文件
  - index.js  --  组件入口文件
+ test  --  单元测试
+ .env.dev  --  开发环境变量
+ .env.prd  --  生产环境变量
+ .eslintrc.js  --  eslint配置文件
+ .gitignore  --  git代码提交配置
+ babel.config.js  --  babel配置文件
+ prettier.config.js  --  eslint格式配置文件
+ jest.config.js  --  jest单元测试配置
+ README.md   --  项目记录文件
+ package.json    --  项目启动配置

# 项目记录

前端的打包工具主要有 **webpack**、 **rollup**、 **gulp**等。

[**Gulp**](https://link.juejin.cn?target=https%3A%2F%2Fwww.gulpjs.com.cn%2Fdocs%2Fgetting-started%2Fquick-start%2F) 是一个基于任务驱动的自动化构建工具。

[**Webpack**](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fguides%2Fgetting-started%2F) 是当下最热门的前端资源模块化 管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分割，等到实际需要的时候再异步加载。

[**Rollup**](https://link.juejin.cn?target=https%3A%2F%2Fwww.rollupjs.com%2Fguide%2Fintroduction) 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

![image-20220607220244478](/Users/cici/Library/Application Support/typora-user-images/image-20220607220244478.png)

## rollup

Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

简单点来说，就是 gulp 适合小项目，基于流程构建；webpack 适用于大型的应用项目，以模块划分，按需加载；而 rollup 适用于工具库的构建，优化代码。现在前端的 vue、 react 框架都是用 rollup 来打包的，也有一些 ui 框架的打包也是用的 rollup。

## rollup 依赖包

#### rollup-plugin-vue

rollup-plugin-vue用于处理vue文件，vue2和vue3项目所用的rollup-plugin-vue版本不一样，vue的编译器也不一样。

- vue2：rollup-plugin-vue^5.1.9 + vue-template-compiler
- vue3：rollup-plugin-vue^6.0.0 + @vue/compiler-sfc

在rollup.config.js中加入rollup-plugin-vue

```js
import vue from 'rollup-plugin-vue'
export default {
  ...
  plugins:[
    vue()
  ]
}
```

#### rollup-plugin-node-resolve

自动识别文件后缀：

```js
import resolve from 'rollup-plugin-node-resolve';
export default {
  ...
  plugins:[
    resolve({
      extensions: ['.vue', '.js']
    }),
  ]
}
```

#### rollup-plugin-postcss

处理css需要用到的插件是rollup-plugin-postcss。它支持css文件的加载、css加前缀、css压缩、对scss/less的支持等等。

这里安装不做过多强调，差哪些包在打包时会自动提示。

```js
import postcss from 'rollup-plugin-postcss';
export default {
  ...
  plugins:[
    postcss({
      plugins: [require('autoprefixer')],
      // 把 css 插入到 style 中
      inject: true,
      // 把 css 放到和js同一目录
      // extract: true,
      minimize: true,
      sourceMap: false,
      extensions: ['.sass', '.scss', '.less', '.css']
    }),
  ]
}
```

#### rollup-plugin-babel

rollup-plugin-babel用于转换es6为es5语法，还需要其他比如`@babel/preset-env`包来配合解析。

```js
import babel from 'rollup-plugin-babel';
export default {
  ...
  plugins:[
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.vue']
    }),
  ]
}
```

#### rollup-plugin-terser

rollup-plugin-terser用于压缩代码，它可以混淆和大幅度压缩代码体积。

```js
import { terser } from 'rollup-plugin-terser';
export default {
  ...
  plugins:[
    terser(),
  ]
}
```

#### rollup-plugin-peer-deps-external 

打包的时候用来排除 package.json 内 peerDependencies 字段内的包    

#### #### @rollup/plugin-node-resolve     

使用Node解析算法定位模块  

#### @rollup/plugin-commonjs         

CommonJS模块转换    

#### @rollup/plugin-json              

 json 文件解析    

#### @rollup/plugin-replace           

在打包文件时替换文件中的字符串   

 #### Rollup.config.js文件

```javascript
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json'
import babel from 'rollup-plugin-babel';
import {
	eslint
} from 'rollup-plugin-eslint';
import {
	terser
} from 'rollup-plugin-terser';
// import replace from '@rollup/plugin-replace'
export default {
	input: './src/main.js',
	external: ['vue'],
	output: [{
			name: 'libName',
			file: './lib/index.js',
			format: 'umd',
			sourcemap: false,
			externalLiveBindings: false,
			globals: {
				vue: 'vue'
			}
		},
		{
			name: 'libName',
			file: './lib/index.module.js',
			format: 'es',
			sourcemap: false,
			globals: {
				vue: 'vue'
			}
		},
		{
			name: 'libName',
			file: './lib/index.main.js',
			format: 'cjs',
			sourcemap: false,
			globals: {
				vue: 'vue'
			}
		},
	],
	plugins: [
		peerDepsExternal(),
		vue({
			css: true
		}),
		resolve({
			extensions: ['.vue', '.js']
		}),
		postcss({
			plugins: [require('autoprefixer')],
			// 把 css 插入到 style 中
			inject: true,
			// 把 css 放到和js同一目录
			// extract: true,
			minimize: true,
			sourceMap: false,
			extensions: ['.sass', '.scss', '.less', '.css']
		}),
		commonjs(),
		babel({
			runtimeHelpers:true,
			exclude: 'node_modules/**',
			extensions: ['.js', '.vue']
		}),
		eslint({
			throwOnError: true,
			throwOnWarning: true,
			include: ['src/**'],
			exclude: ['node_modules/**']
		}),
		json(),
		scss(),
		terser(),
	]
}
```

## 数据设计
### 只评分
```js
id: 10842,
type: "nps", // 问卷类型 nps ces normal
channelType:"web", // 问卷渠道 web link wx ios android
modality: "dialog", //问卷形式 dialog icon
location: "bottom", // 显示位置 底部中间 bottomCenter 底部右边bottomRight 底部左边 bottomLeft 底部平铺bottomTile 右下 Rightbottom  页面中间 pageCenter
displayMode: "1",// 以月计算
disPlayTime: "20", // 以秒计算 暂时20秒默认
mainColor:"#0A8AF8",//主色 默认16位
textColor:"#333333",// 文本颜色 默认16位
bgColor:"#FFFFFF",// 背景色 默认16位 
title: "你有多大可能性将我们推荐给朋友?", //问卷问题
high_legend: "非常愿意", // 评分最高值显示
low_legend: "肯定不会", // 评分最低值显示
max: 10, //评分最高值
min: 0, // 评分最低值
rating_list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //分数范围
next_question_index: 0,
question_count: 4,
question_id: 10842,
```