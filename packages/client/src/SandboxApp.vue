<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col class="top-menu">
          <v-btn :to="ROUTES.DEMO_CHARTS" color="purple lighten-3">
            Demo charts
          </v-btn>
          <v-btn :to="ROUTES.GRID"> Global Overview </v-btn>
        </v-col>
        <v-col>
          <template v-if="loaded">
            <router-view />
          </template>
        </v-col>
      </v-row>
      <ChartCard v-model="chartDialog" />
    </v-main>
  </v-app>
</template>

<script>
import { ROUTES } from "@/settings/routes";
import ChartCard from "@/components/cards/ChartCard";
import { mapGetters } from "vuex";

export default {
  name: "SandboxApp",
  components: { ChartCard },
  async beforeCreate() {
    // TODO Uncomment to save store to localstorage.
    // this.$store.commit("chart/initialiseStore");
    await this.$store.dispatch("chart/fetchCharts");
    this.loaded = true;
  },
  data: () => ({
    ROUTES,
    chartDialog: false,
    loaded: false,
  }),
  computed: {
    ...mapGetters("chart", ["charts"]),
    activeCharts() {
      return this.charts.filter((el) => !el.disabled);
    },
  },
  methods: {
    createChart() {
      this.chartDialog = 0;
    },
  },
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
  max-width: 320px;
  a {
    margin-bottom: 15px !important;
    width: 100%;
  }
  .subtitle {
    text-align: center;
    padding-bottom: 8px;
    font-weight: bold;
    margin-top: 15px;
  }
}
</style>
