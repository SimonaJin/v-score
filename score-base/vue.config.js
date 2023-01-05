const {resolve} = require('path')

module.exports = {
	publicPath:'/score',
	lintOnSave:true,
	runtimeCompiler:true,
	productionSourceMap:false,
	outputDir:"dist",
	indexPath:'index.html',
	pages: {
    index: {
      // page 的入口
      entry: 'play/main.js',
      // 模板来源
      template: 'play/public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '项目评分-scoreBase',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
	chainWebpack(config) {
		config.resolve.alias
			.set('@utils',resolve('./src/utils'))
			.set('@css',resolve('./src/common/css'))
			.set('@comp',resolve('./src/packages/components'))
			.set('@svg',resolve('./src/icon'))
			.set('@Ascss',resolve('./play/style'))
			.set('@Acomp',resolve('./play/components'))
			.set('@Autils',resolve('./play/utils'))
			.set('@Aviews',resolve('./play/views'))
			.set('@Aconfig',resolve('./play/config'))
			.set('@Aicon',resolve('./icons'))
			.set('@AImg',resolve('./play/assets'))
			.set('@AStore',resolve('./play/store'))
    config.module
      .rule('svg')
      .exclude.add(resolve('./icons'))       //注意svg的存储地址
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./icons'))        //注意svg的存储地址
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
	devServer: {
		open:true,
		host:'localhost',
		port:8080,
		https:false,
		hotOnly:false,
    proxy: {
      '/score/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
				pathRewrite:{
					"^/score/api":'/score'
				}
      },
    }
  }
}