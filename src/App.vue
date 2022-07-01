<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col class="top-menu">
          <v-btn :to="ROUTES.PIE_CHART">Pie chart</v-btn>
          <v-btn :to="ROUTES.COLUMNS_CHART">Column chart</v-btn>
          <v-btn :to="ROUTES.RADAR_CHART" class="mr-3">Radar chart</v-btn>
          <v-btn :to="ROUTES.DEMO_CHARTS" color="purple lighten-3"
            >Demo charts</v-btn
          >
        </v-col>
        <v-col>
          <router-view />
        </v-col>
      </v-row>
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
  padding-top: 10px !important;
}
.top-menu {
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 90px;
  max-width: 300px;
  a {
    margin-bottom: 15px !important;
    width: 100%;
  }
}
</style>
