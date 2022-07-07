<template>
  <v-app class="page-bg">
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
