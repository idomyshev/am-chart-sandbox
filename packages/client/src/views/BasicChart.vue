<template>
  <div>
    <div style="position: relative">
      <v-btn
        @click="showSettingsDialog = true"
        style="position: absolute; top: -35px; right: 0"
        icon
      >
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
    </div>
    <div class="am-charts-container" ref="amChart"></div>
    <v-dialog v-model="showSettingsDialog" max-width="700">
      <v-card>
        <v-card-title>{{ chart.name }} - Edit chart</v-card-title>
        <v-card-text>
          <SettingsArea v-if="showSettingsDialog" v-model="config" />
        </v-card-text>
        <v-card-actions class="justify-end pb-4">
          <v-btn @click="showSettingsDialog = false" depressed>Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!--  <v-row>-->
  <!--    <v-col cols="5" v-if="false">-->
  <!--      <SettingsArea v-if="configLoaded" v-model="config" />-->
  <!--    </v-col>-->
  <!--    <v-col cols="12">-->
  <!--      <div class="chart-wrapper">-->
  <!--        <div class="am-charts-container" ref="amChart"></div>-->
  <!--      </div>-->
  <!--    </v-col>-->
  <!--  </v-row>-->
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

export default {
  name: "BasicChart",

  components: { SettingsArea },

  props: {
    chart: Object,
  },

  data() {
    return {
      chartObject: null,
      config: null,
      configLoaded: false,
      firstLoad: true,
      showSettingsDialog: false,
    };
  },

  computed: {
    ...mapGetters("chart", ["charts"]),
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
        if (!this.firstLoad) {
          this.saveConfig({ id: this.chart.id, config: val });
        }
        this.firstLoad = false;
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
      const chartTemplateName = this.chart.template;
      switch (chartTemplateName) {
        case "ChartA":
          this.chartObject = new ChartA();
          break;
        case "ChartB":
          this.chartObject = new ChartB();
          break;
      }

      const savedConfig = await this.loadSavedConfig(this.chart.id);
      this.config = this.chartObject.createConfig(
        chartTemplateName,
        savedConfig
      );
      this.configLoaded = true;
    },

    async loadSavedConfig(chartId) {
      const configInStore = this.getConfigs()[chartId];

      if (configInStore) {
        return configInStore;
      }

      const res = await apiRequest({
        path: API_ROUTES.CHARTS,
      });

      if (res?.success) {
        const savedItem = res.data.find((el) => el.id == this.chart.id);
        if (savedItem?.config && Object.keys(savedItem.config).length) {
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

        this.chartObject.create(root);

        this.root = root;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
