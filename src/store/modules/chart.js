import { API_ROUTES } from "@/settings/apiRoutes";
import { apiRequest } from "@/api/api";

const state = () => ({
  configs: {},
});

const getters = {
  getConfigs(state) {
    return state.configs;
  },
};
const actions = {};
const mutations = {
  async saveConfig(state, val) {
    const { name, config } = val;
    state.configs[name] = config;
    const res = await apiRequest({
      path: API_ROUTES.CHART,
      method: "post",
      data: {
        name,
        config,
      },
    });
    if (!res?.success) {
      console.error(`Error when try to save chart ${name}`);
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
