import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import {  } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

const app = createApp(App);
//app.use(BootstrapVue);
app.use(router).mount('#app')