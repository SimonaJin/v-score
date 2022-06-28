import esConfig from './es.config';
import umdConfig from './cjs.config';
import unpkgConfig from './iife.config';
import minimist from 'minimist'
const argv = minimist(process.argv.slice(2))

const buildFormats = []
// 判断不同打包模式
switch (argv.format) {
	case 'es':
		console.log('es')
		buildFormats.push(esConfig)
		break;
	case 'cjs':
		console.log('cjs')
		buildFormats.push(umdConfig)
		break;
	case 'iife':
		console.log('iife')
		buildFormats.push(unpkgConfig)
		break;
	default:
		console.log('default')
		break;
}

export default buildFormats