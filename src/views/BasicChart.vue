<template>
  <v-row>
    <v-col cols="5">
      <SettingsArea
        v-if="settingsLoaded"
        v-model="chartSettings"
        @enabledFeaturesUpdated="enabledFeaturesUpdated"
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
import { Chart } from "@/classes/Chart";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { chartConfigs } from "@/settings/charts";
import { isFeatureEnabled } from "@/helpers/settings";

export default {
  name: "BasicChart",

  components: { SettingsArea },

  data() {
    return {
      chartSettings: null,
      chart: null,
      chartConfig: null,
      settingsLoaded: false,
      enabledFeatures: [],
    };
  },

  async beforeMount() {
    this.runChart();
  },

  mounted() {
    if (this.settingsLoaded) {
      this.initDiagram();
    }
  },

  beforeDestroy() {
    this.stopChart();
  },

  watch: {
    chartSettings: {
      handler() {
        this.initDiagram();
      },
      deep: true,
    },
    $route() {
      this.stopChart();
      this.runChart();
    },
  },

  methods: {
    enabledFeaturesUpdated(val) {
      this.enabledFeatures = val;
    },
    runChart() {
      this.chart = new Chart();
      this.chartConfig = chartConfigs[this.$route.name];
      if (!this.chartConfig) {
        console.error("Config file for chart is not defined!");
        return;
      }
      this.settingsLoaded = true;
      // const chartSettings = this.chartConfig.initConfig();
      this.chartSettings = this.chart.initSettings();
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

      root.setThemes([am5themes_Animated.new(root)]);

      const initChartResult = this.chartConfig.initChart(
        root,
        this.chartSettings,
        this.enabledFeatures
      );

      const [chart, series] = initChartResult;

      this.chart.init(root, chart, [series]);
      if (isFeatureEnabled(this.enabledFeatures, "animation")) {
        this.chart.addAnimation();
      }
      //
      // if (this.chartSettings.features._noSubGroup.bullets.value) {
      //   this.chart.addBullets();
      // }

      this.root = root;
    },
  },
};
</script>

<style lang="scss" scoped></style>
