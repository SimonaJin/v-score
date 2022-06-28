import { createApp } from 'vue'
import App from './App.vue';
import router from './router'
// import Message from "../src/packages/alert/index";
import Modal from "../src/packages/index";
const app = createApp(App);

app.use(Modal);
app.use(router).mount('#app');
