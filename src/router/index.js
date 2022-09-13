import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";
import container from "../components/container";
import train from "../components/train";
import home from "../components/home";
import map from "../view/map";
import history from "../view/history";
import datachart from "../view/datachart";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "login",
      component: login
    },

    {
      path: "/home",
      name: "home",
      component: home,
      children: [
        {
          path: "/ledger",
          name: "ledger",
          component: () => import("@/view/ledger")
        },
        {
          path: "/container",
          name: "container",
          component: container
        },
        {
          path: "/history",
          name: "history",
          component: history
        },
        {
          path: "/datachart",
          name: "datachart",
          component: datachart
        },
        {
          path: "/train",
          name: "train",
          component: train
        },
        {
          path: "/realtime",
          name: "realtime",
          component: () => import("@/view/realTime.vue")
        },
        {
          path: "/addlat",
          name: "addlat",
          component: () => import("@/view/addLat.vue")
        }
      ]
    },
    {
      path: "/map",
      name: "map",
      component: map
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 如果是登录页则放行
  if (to.path === "/") return next();
  // 查看token是否存在
  const token = window.localStorage.getItem("Authorization");
  if (!token) {
    return next("/");
  }
  next();
});
export default router;
