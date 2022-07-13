import { API_ROUTES } from "@/settings/apiRoutes";
import { apiRequest } from "@/api/api";

const state = () => ({
  instances: {},
  meta: {},
});

const getters = {
  chartsInstances(state) {
    return state.instances;
  },
  chartsMeta(state) {
    return state.meta;
  },
};
const actions = {};
const mutations = {
  setInstance(state, val) {
    state.instances[val.name] = val.value;
  },
  async setMeta(state, val) {
    state.meta[val.name] = val.value;
    const res = await apiRequest({
      path: API_ROUTES.CHART,
      method: "post",
      data: {
        name: val.name,
        config: val.value,
      },
    });
    if (res.success) {
      console.log(`chart ${val.name} saved successfully`);
    } else {
      console.error(`error when try to save chart ${val.name}`);
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
