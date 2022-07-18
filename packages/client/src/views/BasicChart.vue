<template>
  <v-row>
    <v-col cols="5">
      <SettingsArea v-if="configLoaded" v-model="config" />
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
import { ChartA } from "@/classes/customCharts/ChartA";
import { ChartB } from "@/classes/customCharts/ChartB";
import { mapGetters, mapMutations } from "vuex";
import { API_ROUTES } from "@/settings/apiRoutes";
import { apiRequest } from "@/api/api";
//import { API_ROUTES } from "@/settings/apiRoutes";
//import { apiRequest } from "@/api/api";

export default {
  name: "BasicChart",

  components: { SettingsArea },

  data() {
    return {
      config: null,
      configLoaded: false,
      chart: null,
      firstLoad: true,
    };
  },

  async beforeMount() {
    await this.loadChartClass();
  },

  beforeDestroy() {
    this.killChart();
  },

  watch: {
    config: {
      handler(val) {
        this.createChart();
        // if (!this.firstLoad) {
        this.saveConfig({ name: this.$route.name, config: val });
        // }
        // this.firstLoad = false;
      },
      deep: true,
    },
    $route() {
      this.killChart();
      this.loadChartClass();
    },
  },

  methods: {
    ...mapMutations("chart", ["saveConfig"]),
    ...mapGetters("chart", ["getConfigs"]),
    async loadChartClass() {
      const chartClassName = this.$route.name;
      switch (chartClassName) {
        case "ChartA":
          this.chart = new ChartA();
          break;
        case "ChartB":
          this.chart = new ChartB();
          break;
      }

      const savedConfig = await this.loadSavedConfig(chartClassName);
      this.config = this.chart.createConfig(chartClassName, savedConfig);
      this.configLoaded = true;
    },

    async loadSavedConfig(chartClassName) {
      const configInStore = this.getConfigs()[chartClassName];

      if (configInStore) {
        return configInStore;
      }

      const res = await apiRequest({
        path: API_ROUTES.CHARTS,
      });

      if (res?.success) {
        const savedItem = res.data.find((el) => el.name === chartClassName);
        if (savedItem?.config) {
          return savedItem.config;
        }
      } else {
        console.error(`error when try to get charts with API`);
      }

      return null;
    },

    killChart() {
      if (this.root) {
        this.root.dispose();
      }
    },

    createChart() {
      am5.ready(() => {
        this.killChart();

        const root = am5.Root.new(this.$refs.amChart, {
          useSafeResolution: false,
        });

        root.setThemes([am5themes_Animated.new(root)]);

        this.chart.create(root);

        this.root = root;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
