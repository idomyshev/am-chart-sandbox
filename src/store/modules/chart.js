const state = () => ({
  instances: {},
});

const getters = {
  chartInstances(state) {
    return state.instances;
  },
};
const actions = {};
const mutations = {
  setInstance(state, val) {
    state.instances[val.name] = val.value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
