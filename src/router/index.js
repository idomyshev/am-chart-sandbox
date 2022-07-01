import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "@/settings/routes";
import ColumnChart from "@/components/constructor/ColumnChart";
import PieChart from "@/components/constructor/PieChart";
import DemoCharts from "@/views/DemoCharts";
import RadarChart from "@/components/constructor/RadarChart";
import BarChart from "@/components/constructor/BarChart";

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
    path: ROUTES.RADAR_CHART,
    name: "radar",
    component: RadarChart,
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
