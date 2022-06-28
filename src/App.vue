<template>
  <v-app>
    <v-main>
      <div>
        <v-btn :to="ROUTES.COLUMNS_CHART" class="mr-3">Columns chart</v-btn>
        <v-btn :to="ROUTES.BAR_CHART" class="mr-3">Bar chart</v-btn>
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
  background: black;
}
</style>
