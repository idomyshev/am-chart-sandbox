import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "@/settings/routes";
import ColumnChart from "@/components/constructor/ColumnChart";
import PieChart from "@/components/constructor/PieChart";
import DemoCharts from "@/views/DemoCharts";
import RadarChart from "@/components/constructor/RadarChart";
import BarChart from "@/components/constructor/BarChart";
import LineChart from "@/components/constructor/LineChart";
import AreaChart from "@/components/constructor/AreaChart";
import PolarChart from "@/components/constructor/PolarChart";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.DEMO_CHARTS,
    name: "demo",
    component: DemoCharts,
  },
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
    path: ROUTES.POLAR_CHART,
    name: "polar",
    component: PolarChart,
  },
  {
    path: ROUTES.LINE_CHART,
    name: "line",
    component: LineChart,
  },
  {
    path: ROUTES.AREA_CHART,
    name: "area",
    component: AreaChart,
  },
  {
    path: ROUTES.XY_CHART,
    name: "xy",
    component: AreaChart,
  },
  {
    path: ROUTES.BUBBLE_CHART,
    name: "bubble",
    component: AreaChart,
  },
  {
    path: ROUTES.HIERARCHY_CHART,
    name: "hierarchy",
    component: AreaChart,
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
