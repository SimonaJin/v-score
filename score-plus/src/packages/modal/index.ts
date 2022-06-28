import { App } from 'vue'
import Modal from './index.vue'
Modal.install = (app: App) => {
	app.component(Modal.name, Modal)
}

export default Modal

// import { Component, createApp } from 'vue'
// export function useMountComponent(rootComponent: Component) {
// 	const app = createApp(rootComponent);
// 	const root = document.createElement('div');
// 	document.body.appendChild(root);
// 	return {
// 		instance: app.mount(root),
// 		unmount() {
// 			app.unmount();
// 			document.body.removeChild(root);
// 		},
// 	};
// }