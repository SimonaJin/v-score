const devPresets = ['@vue/cli-plugin-babel/preset']
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
		'@babel/preset-typescript'
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
	presets: presetsName,
	comments: false
}
