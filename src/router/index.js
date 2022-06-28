import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "@/settings/routes";
import BarChart from "@/components/BarChart";
import ColumnsChart from "@/components/ColumnsChart";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.HOME,
    name: "home",
    component: ColumnsChart,
  },
  {
    path: ROUTES.BAR_CHART,
    name: "bar",
    component: BarChart,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || "EmptyVue2App";
  });
});

export default router;
