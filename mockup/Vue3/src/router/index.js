import { createRouter, createWebHashHistory } from 'vue-router'
import Blank from '../views/Blank.vue'
import List from '../views/List.vue'
import Grid from '../views/Grid.vue'
import Master_Detail from '../views/Master_Detail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Blank
  },
  {
    path: '/List',
    name: 'List',
    component: List
  },
  {
    path: '/Grid',
    name: 'Grid',
    component: Grid
  },
  {
    path:'/Master_Detail',
    name:'Master_Detail',
    component: Master_Detail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
