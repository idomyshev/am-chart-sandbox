import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "@/settings/routes";
import ColumnChart from "@/components/constructor/ColumnChart";
import DemoCharts from "@/views/DemoCharts";
import BarChart from "@/components/constructor/BarChart";
import AreaChart from "@/components/constructor/AreaChart";
import PolarChart from "@/components/constructor/PolarChart";
import HierarchyChart from "@/components/constructor/HierarchyChart";
import XyChart from "@/components/constructor/XyChart";
import ChartConstructor from "@/views/ChartConstructor";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.DEMO_CHARTS,
    name: "demo",
    component: DemoCharts,
  },
  {
    path: ROUTES.PIE_CHART,
    name: "pieChart",
    component: ChartConstructor,
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
    name: "radarChart",
    component: ChartConstructor,
  },
  {
    path: ROUTES.POLAR_CHART,
    name: "polar",
    component: PolarChart,
  },
  {
    path: ROUTES.AREA_CHART,
    name: "area",
    component: AreaChart,
  },
  {
    path: ROUTES.XY_CHART,
    name: "xy",
    component: XyChart,
  },
  {
    path: ROUTES.HIERARCHY_CHART,
    name: "hierarchy",
    component: HierarchyChart,
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
