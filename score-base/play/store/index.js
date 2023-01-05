import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstat from 'vuex-persistedstate'
import getters from './getters'
import rootModule from './rootModule'

Vue.use(Vuex)

const files = require.context('./modules',false, /\.js$/);
let persistedstatList =[]
files.keys().forEach(key => {
	const store = files(key).default;
	let moudleName = key.replace(/^\.\//,'').replace(/\.js$/,'');
	let moudles = rootModule.modules = (rootModule.modules || {})
	moudles[moudleName] = store;
	moudles[moudleName].namespaced = true
	if(moudles[moudleName].pluginParas === true){
		persistedstatList.push(moudleName)
	}
});

rootModule.getters = getters
rootModule .plugins = [
	createPersistedstat({
		key:'pc-store',
		paths:persistedstatList
	})
]
const store = new Vuex.Store(rootModule)

export default store
