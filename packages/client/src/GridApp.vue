<template>
  <v-app class="page-bg">
    <div
      v-if="false"
      style="
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(122, 122, 122, 0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div
        style="
          background: #fff;
          border-radius: 20px;
          color: #000;
          padding: 50px;
          font-size: 2em;
        "
      >
        The app is available at
        <a href="https://am-chart-sandbox.herokuapp.com" style="color: #f66"
          >https://am-chart-sandbox.herokuapp.com</a
        >
      </div>
    </div>
    <div class="app-wrapper">
      <Menu></Menu>
      <div class="app-content">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import Menu from "@/components/Menu.vue";

export default Vue.extend({
  name: "GridApp",

  components: {
    Menu,
  },

  data() {
    return {};
  },
});
</script>

<style lang="scss">
@import "./src/scss/theme.scss";
@import "./src/scss/custom_style.scss";

.app-wrapper {
  display: flex;
}

.app-content {
  width: 100%;
  padding: 0 48px;
}
</style>
