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
    <router-view></router-view>
  </v-app>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "GridApp",

  components: {},

  data() {
    return {};
  },
});
</script>

<style lang="scss">
@import "./src/scss/theme.scss";
@import "./src/scss/custom_style.scss";
</style>
