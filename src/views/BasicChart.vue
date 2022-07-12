<template>
  <v-row>
    <v-col cols="5">
      <SettingsArea
        v-if="settingsLoaded"
        v-model="chartSettings"
        @updateEnabledFeatures="updateEnabledFeatures"
        :configMeta="configMeta"
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
      chartSettings: null,
      chart: null,
      settingsLoaded: false,
      enabledFeatures: [],
      configMeta: {},
    };
  },

  async beforeMount() {
    this.runChart();
  },

  beforeDestroy() {
    this.stopChart();
  },

  watch: {
    chartSettings: {
      handler() {
        this.setInstance({ name: this.$route.name, value: this.chartSettings });
        this.initDiagram();
      },
      deep: true,
    },
    enabledFeatures: {
      handler() {
        this.initDiagram();
      },
    },
    $route() {
      this.stopChart();
      this.runChart();
    },
  },

  methods: {
    ...mapMutations("chart", ["setInstance"]),
    ...mapGetters("chart", ["chartInstances"]),
    updateEnabledFeatures(val) {
      this.enabledFeatures = val;
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
      const config = chartConfigs[chartName]();
      this.chart.setChartConfig(config);
      this.configMeta = config.meta;
      const savedPlaygrounds = this.chartInstances();
      const savedChart = savedPlaygrounds[chartName];
      console.log(5, savedPlaygrounds);
      console.log(4, savedChart);
      const savedSettings = savedPlaygrounds[chartName]
        ? savedPlaygrounds[chartName]
        : null;
      this.chartSettings = this.chart.loadSettings(savedSettings);
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
