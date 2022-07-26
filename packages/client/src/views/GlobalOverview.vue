<template>
  <div class="app-wrapper">
    <Menu />
    <div class="app-content">
      <div class="global-overview">
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
        <Filters />
        <Grid />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Filters from "@/components/Filters.vue";
import Grid from "@/components/Grid.vue";
import Menu from "@/components/Menu";
import { ROUTES } from "@/settings/routes";

export default Vue.extend({
  name: "GlobalOverview",
  components: {
    Filters,
    Grid,
    Menu,
  },
  data() {
    return {
      ROUTES,
    };
  },
});
</script>
<style lang="scss">
@import "./src/scss/theme.scss";
@import "./src/scss/custom_variables.scss";

.app-wrapper {
  display: flex;
}

.app-content {
  width: 100%;
  padding: 0 48px;
}
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
