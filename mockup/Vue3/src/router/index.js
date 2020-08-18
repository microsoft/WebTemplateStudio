import { createRouter, createWebHistory } from 'vue-router'
import Blank from '../views/Blank.vue'
//import Grid from "../views/Grid.vue";
//import Master_Detail from "../views/Master_Detail.vue";
import List from "../views/List.vue";

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    { path: "/", component: Blank },
    { path: "/List", component: List },
  ]
})

export default router