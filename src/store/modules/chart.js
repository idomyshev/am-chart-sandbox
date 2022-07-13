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
  setMeta(state, val) {
    state.meta[val.name] = val.value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
