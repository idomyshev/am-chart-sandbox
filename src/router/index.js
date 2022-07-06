import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "@/settings/routes";
import DemoCharts from "@/views/DemoCharts";
import PolarChart from "@/components/constructor/PolarChart";
import XyChart from "@/components/constructor/XyChart";
import BasicChart from "@/views/BasicChart";

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
    component: BasicChart,
  },
  {
    path: ROUTES.COLUMNS_CHART,
    name: "columnChart",
    component: BasicChart,
  },
  {
    path: ROUTES.BAR_CHART,
    name: "barChart",
    component: BasicChart,
  },
  {
    path: ROUTES.RADAR_CHART,
    name: "radarChart",
    component: BasicChart,
  },
  {
    path: ROUTES.POLAR_CHART,
    name: "polar",
    component: PolarChart,
  },
  {
    path: ROUTES.AREA_CHART,
    name: "areaChart",
    component: BasicChart,
  },
  {
    path: ROUTES.XY_CHART,
    name: "xy",
    component: XyChart,
  },
  {
    path: ROUTES.HIERARCHY_CHART,
    name: "hierarchyChart",
    component: BasicChart,
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
