import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "@/settings/routes";
import BarChart from "@/components/BarChart";
import ColumnChart from "@/components/ColumnChart";
import PieChart from "@/components/PieChart";
import DemoCharts from "@/components/DemoCharts";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.PIE_CHART,
    name: "pie",
    component: PieChart,
  },
  {
    path: ROUTES.COLUMNS_CHART,
    name: "column",
    component: ColumnChart,
  },
  {
    path: ROUTES.BAR_CHART,
    name: "bar",
    component: BarChart,
  },
  {
    path: ROUTES.DEMO_CHARTS,
    name: "demo",
    component: DemoCharts,
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
    document.title = to.meta.title || "AmChartSandbox";
  });
});

export default router;
