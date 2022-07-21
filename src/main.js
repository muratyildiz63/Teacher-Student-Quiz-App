import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from "axios"
import { appAxios } from './utlis/appAxios';
import "@/assets/style.css"
import store from './store';

const app = createApp(App);
app.use(router)
app.use(store)
app.config.globalProperties.$axios = axios /* globan olrak axios eklemek */
app.config.globalProperties.$appAxios = appAxios /* globan olrak axios url eklemek */

app.mount('#app')