import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/assets/scss/main.scss";

// TODO Uncomment to get store from the localstorage.
// Save the store.
// store.subscribe((mutation, state) => {
//   localStorage.setItem("store", JSON.stringify(state));
// });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
