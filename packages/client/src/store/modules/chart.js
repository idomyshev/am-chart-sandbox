import { API_ROUTES } from "@/settings/apiRoutes";
import { apiRequest } from "@/api/api";

const state = () => ({
  charts: [],
});

const getters = {
  charts(state) {
    return state.charts;
  },
};
const actions = {
  async fetchCharts(context) {
    const res = await apiRequest({
      path: API_ROUTES.CHARTS,
    });
    if (res?.success && res.data?.length) {
      context.commit("setCharts", res.data);
    } else {
      console.error(`error when try to get charts with API`);
    }
    return null;
  },
};
const mutations = {
  initialiseStore(state) {
    if (localStorage.getItem("store")) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    }
  },
  setCharts(state, val) {
    state.charts = val;
  },
  async saveConfig(state, val) {
    const { id, config } = val;
    const res = await apiRequest({
      path: API_ROUTES.CHART,
      method: "post",
      data: {
        id,
        config,
      },
    });
    if (!res?.success) {
      console.error(`Error when try to save chart id, ${id}`);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
