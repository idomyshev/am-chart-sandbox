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
        name: "GlobalOverview",
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
        path: ROUTES.CHART,
        name: "chart",
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
