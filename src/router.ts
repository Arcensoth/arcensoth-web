import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("./views/Projects.vue")
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("./views/Tools.vue")
    },
    {
      path: "/tools/imp",
      name: "tools_imp",
      component: () => import("./views/ToolsImp.vue")
    }
  ],
  linkActiveClass: "my-link-active-class"
});
