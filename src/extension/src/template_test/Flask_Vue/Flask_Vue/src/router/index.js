import Vue from "vue";
import VueRouter from "vue-router";

import Blank from "../views/Blank.vue";
import Grid from "../views/Grid.vue";
import List from "../views/List.vue";
import Master_Detail from "../views/Master_Detail.vue";
Vue.use(VueRouter);

// TODO Web Template Studio: Add routes for your new pages here.
export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/Master_Detail", component: Master_Detail },
    { path: "/List", component: List },
    { path: "/Grid", component: Grid },
    { path: "/Blank", component: Blank },

    { path:"/", redirect: "/Blank" }
  ]
});
