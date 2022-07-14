<template>
  <v-row>
    <v-col cols="5">
      <SettingsArea
        v-if="configLoaded"
        v-model="settings"
        @updateEnabledFeatures="updateEnabledFeatures"
      />
    </v-col>
    <v-col cols="7">
      <div class="chart-wrapper">
        <div class="am-charts-container" ref="amChart"></div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import SettingsArea from "@/components/SettingsArea";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { chartConfigs } from "@/settings/charts";
import { ChartA } from "@/classes/customCharts/ChartA";
import { ChartB } from "@/classes/customCharts/ChartB";
import { mapGetters, mapMutations } from "vuex";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/apiRoutes";

export default {
  name: "BasicChart",

  components: { SettingsArea },

  data() {
    return {
      settings: null,
      chart: null,
      configLoaded: false,
      enabledFeatures: [],
      firstLoad: true,
    };
  },

  async beforeMount() {
    await this.updateChartConfig();
  },

  beforeDestroy() {
    this.killChart();
  },

  watch: {
    settings: {
      handler() {
        this.setInstance({ name: this.$route.name, value: this.settings });
        this.createChart();
      },
      deep: true,
    },
    enabledFeatures: {
      handler(val) {
        if (!this.firstLoad) {
          this.setMeta({
            name: this.$route.name,
            value: { ...this.chartMeta, features: val },
          });
        }
        this.createChart();
        this.firstLoad = false;
      },
    },
    $route() {
      this.killChart();
      this.updateChartConfig();
    },
  },

  methods: {
    ...mapMutations("chart", ["setInstance", "setMeta"]),
    ...mapGetters("chart", ["chartsInstances", "chartsMeta"]),
    updateEnabledFeatures(val) {
      this.enabledFeatures = val;
      this.chartMeta = { ...this.chartMeta, features: val };
    },
    async updateChartConfig() {
      const prototypeName = this.$route.name;
      switch (prototypeName) {
        case "ChartA":
          this.chart = new ChartA();
          break;
        case "ChartB":
          this.chart = new ChartB();
          break;
      }

      this.config = this.chart.createConfig(prototypeName);
      this.configLoaded = true;

      // let savedMeta = this.chartsMeta()[chartName];

      // Fetch meta from backend.
      // if (!savedMeta) {
      //   const res = await apiRequest({
      //     path: API_ROUTES.CHARTS,
      //   });
      //   if (res.success) {
      //     savedMeta = res.data.find((el) => el.name === chartName).config;
      //   } else {
      //     console.error(`error when try to get charts with API`);
      //   }
      // }
      //

      // const savedChart = this.chartsInstances()[chartName];
      // const savedSettings = savedChart ? savedChart : null;
      // this.settings = {settings: this.chart.loadSettings(savedSettings), meta: this.chart.loadMeta;
      //
    },

    killChart() {
      if (this.root) {
        this.root.dispose();
      }
    },

    async createChart() {
      am5.ready(async () => {
        this.killChart();

        const root = am5.Root.new(this.$refs.amChart, {
          useSafeResolution: false,
        });

        this.chart.setRoot(root);
        this.chart.setEnabledFeatures(this.enabledFeatures);

        root.setThemes([am5themes_Animated.new(root)]);

        this.chart.create(root);

        this.root = root;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
