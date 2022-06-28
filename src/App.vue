<template>
  <v-app>
    <v-main>
      <div class="top-menu">
        <v-btn :to="ROUTES.COLUMNS_CHART" class="mr-3">Column</v-btn>
        <v-btn :to="ROUTES.PIE_CHART" class="mr-3">Pie</v-btn>
        <v-btn v-if="false" :to="ROUTES.BAR_CHART" class="mr-3">Bar</v-btn>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { ROUTES } from "@/settings/routes";

export default {
  name: "App",

  data: () => ({
    ROUTES,
  }),
};
</script>
<style lang="scss" scoped>
.v-main {
  background: #ccc;
}
.top-menu {
  width: 1000px;
  margin: 10px auto 0;
}
</style>
