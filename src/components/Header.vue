<template>
  <div class="header">
    <h1>Global Overview</h1>
    <v-btn
      :to="ROUTES.DEMO_CHARTS"
      class="header__btn"
      depressed
      color="secondary"
      >Edit Layout</v-btn
    >
  </div>
</template>

<script>
import Vue from "vue";
import { ROUTES } from "@/settings/routes";

export default Vue.extend({
  name: "Header",

  components: {},

  data() {
    return {
      ROUTES,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./src/scss/theme.scss";
@import "./src/scss/custom_variables.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
}

.header__btn {
  border-radius: $border-radius-small;
  color: var(--v-primary-base) !important;
}
</style>
