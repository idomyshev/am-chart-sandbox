<template>
  <v-row>
    <v-col cols="5">
      <SettingsArea
        v-if="settingsLoaded"
        v-model="settings"
        :meta="chartMeta"
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

export default {
  name: "BasicChart",

  components: { SettingsArea },

  data() {
    return {
      settings: null,
      chart: null,
      settingsLoaded: false,
      enabledFeatures: [],
      chartMeta: {},
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
        this.setMeta({
          name: this.$route.name,
          value: { ...this.chartMeta, features: val },
        });
        this.initDiagram();
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
    runChart() {
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
      const savedMeta = this.chartsMeta()[chartName];
      this.chartMeta = this.chart.loadMeta(savedMeta);
      const savedChart = this.chartsInstances()[chartName];
      const savedSettings = savedChart ? savedChart : null;
      this.settings = this.chart.loadSettings(savedSettings);
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
