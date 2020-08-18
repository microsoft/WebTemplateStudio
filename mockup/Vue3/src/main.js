import { createApp } from 'vue'
//import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import { NavbarPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

const app = createApp(App)

app.use(router)
//Vue.use(NavbarPlugin);
app.mount('#app')