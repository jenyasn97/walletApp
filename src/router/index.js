import { getCookie } from "@/lib/utils";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dash-board",
    component: () => import("@/pages/Dashboardpage.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "login-page",
    component: () => import("@/pages/LoginPage.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/signup",
    name: "signup-page",
    component: () => import("@/pages/RegisterPage.vue"),
    meta: {
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !getCookie("Wallet-Access-Token")) {
    next({ name: "login-page" });
  } else if (!to.meta.auth && getCookie("Wallet-Access-Token")) {
    next({ name: "dash-board" });
  } else {
    next();
  }
});

export default router;
