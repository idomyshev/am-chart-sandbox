import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "@/settings/routes";
import gridApp from "@/GridApp";
import GlobalOverview from "@/views/GlobalOverview";
import SandboxApp from "@/SandboxApp";
import DemoCharts from "@/views/DemoCharts";
import BasicChart from "@/views/BasicChart";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.GRID,
    component: gridApp,
    children: [
      {
        path: "",
        component: GlobalOverview,
        name: "gridApp",
      },
    ],
  },
  {
    path: "",
    component: SandboxApp,
    children: [
      {
        path: ROUTES.DEMO_CHARTS,
        name: "demo",
        component: DemoCharts,
      },
      {
        path: ROUTES.PIE_CHART,
        name: "ChartA",
        component: BasicChart,
      },
      {
        path: ROUTES.COLUMNS_CHART,
        name: "ChartB",
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
        name: "polarChart",
        component: BasicChart,
      },
      {
        path: ROUTES.AREA_CHART,
        name: "areaChart",
        component: BasicChart,
      },
      {
        path: ROUTES.XY_CHART,
        name: "xyChart",
        component: BasicChart,
      },
      {
        path: ROUTES.HIERARCHY_CHART,
        name: "hierarchyChart",
        component: BasicChart,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || "AmChartSandbox";
  });
});

export default router;
