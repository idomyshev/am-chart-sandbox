<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5">
      <SettingsArea v-model="chartSettings" />
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
// import { initConfig } from "@/settings/charts/radarChartConfig";
import { Chart } from "@/classes/Chart";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { chartConfigs } from "@/settings/charts";

export default {
  name: "BasicChart",

  components: { SettingsArea },

  data() {
    return {
      chartSettings: null,
      chart: null,
      chartConfig: null,
    };
  },

  async beforeMount() {
    this.chart = new Chart();
    this.chartConfig = chartConfigs[this.$route.name];
    const chartSettings = this.chartConfig.initConfig();
    this.chartSettings = this.chart.initSettings(chartSettings);
  },

  mounted() {
    this.initDiagram();
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },

  watch: {
    chartSettings: {
      handler() {
        this.initDiagram();
        console.log("settings updated");
      },
      deep: true,
    },
  },

  methods: {
    initDiagram() {
      am5.ready(async () => {
        await this.createDiagram();
      });
    },

    async createDiagram() {
      // const chartModule = await import("@/settings/charts/radarChartConfig.js");
      if (this.root) {
        this.root.dispose();
      }
      const root = am5.Root.new(this.$refs.amChart, {
        useSafeResolution: false,
      });

      root.setThemes([am5themes_Animated.new(root)]);

      const [chart, series] = this.chartConfig.initChart(
        root,
        this.chartSettings
      );

      //mod1.testImport();

      this.chart.init(chart, [series]);
      this.chart.initAnimation();

      this.root = root;
    },
  },
};
</script>

<style lang="scss" scoped></style>
