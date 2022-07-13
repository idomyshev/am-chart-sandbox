<template>
  <v-row>
    <v-col cols="5">
      <SettingsArea
        v-if="settingsLoaded"
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
      settingsLoaded: false,
      enabledFeatures: [],
      firstLoad: true,
    };
  },

  async beforeMount() {
    this.runChart();
  },

  beforeDestroy() {
    this.stopChart();
  },

  watch: {
    settings: {
      handler() {
        this.setInstance({ name: this.$route.name, value: this.settings });
        this.initDiagram();
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
        this.initDiagram();
        this.firstLoad = false;
      },
    },
    $route() {
      this.stopChart();
      this.runChart();
    },
  },

  methods: {
    ...mapMutations("chart", ["setInstance", "setMeta"]),
    ...mapGetters("chart", ["chartsInstances", "chartsMeta"]),
    updateEnabledFeatures(val) {
      this.enabledFeatures = val;
      this.chartMeta = { ...this.chartMeta, features: val };
    },
    async runChart() {
      const chartName = this.$route.name;
      switch (chartName) {
        case "ChartA":
          this.chart = new ChartA();
          break;
        case "ChartB":
          this.chart = new ChartB();
          break;
      }
      if (!chartConfigs[chartName]) {
        console.error("Config file for chart is not defined!");
      }
      this.chart.setChartConfig(chartConfigs[chartName]());
      let savedMeta = this.chartsMeta()[chartName];

      // Fetch meta from backend.
      if (!savedMeta) {
        const res = await apiRequest({
          path: API_ROUTES.CHARTS,
        });
        if (res.success) {
          savedMeta = res.data.find((el) => el.name === chartName).config;
        } else {
          console.error(`error when try to get charts with API`);
        }
      }

      this.chartMeta = this.chart.loadMeta(savedMeta);
      const savedChart = this.chartsInstances()[chartName];
      const savedSettings = savedChart ? savedChart : null;
      this.settings = {settings: this.chart.loadSettings(savedSettings), meta: ;
      this.settingsLoaded = true;
    },
    stopChart() {
      if (this.root) {
        this.root.dispose();
      }
    },
    initDiagram() {
      am5.ready(async () => {
        await this.createDiagram();
      });
    },

    async createDiagram() {
      if (this.root) {
        this.root.dispose();
      }
      const root = am5.Root.new(this.$refs.amChart, {
        useSafeResolution: false,
      });

      this.chart.setRoot(root);
      this.chart.setEnabledFeatures(this.enabledFeatures);

      root.setThemes([am5themes_Animated.new(root)]);

      const initChartResult = this.chart.initChart();

      const { chart, series } = initChartResult;

      this.chart.init(root, chart, series);
      if (this.chart.isFeatureEnabled("animation")) {
        this.chart.addAnimation();
      }

      if (this.chart.isFeatureEnabled("bullets")) {
        this.chart.addBullets();
      }

      this.root = root;
    },
  },
};
</script>

<style lang="scss" scoped></style>
