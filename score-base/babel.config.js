const devPresets = ['@vue/cli-plugin-babel/preset','@babel/preset-env']
const buildPresets = [
	[
		'@babel/preset-env',
		{
			"modules": false,
			useBuiltIns: 'usage',
			corejs: 3,
			targets: {
				browsers: ['> 1%', 'last 2 versions', 'not dead'],
				node: 'current'
			}
		},
	]
]
const testPreset = ['@vue/cli-plugin-babel/preset']
let presetsName;
switch(process.env.NODE_ENV){
	case 'test':
		presetsName = testPreset
		break;
	case 'development':
		presetsName = devPresets
		break;
	case 'production':
		presetsName = buildPresets
		break;
	default:
		presetsName=[]
		break;
}
module.exports = {
	presets:presetsName,
	"plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}