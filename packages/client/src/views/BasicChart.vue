<template>
  <div>
    <div class="edit-chart">
      <v-btn @click="showSettingsDialog = true" class="edit-chart__button" icon>
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
    </div>
    <div class="am-charts-container" ref="amChart"></div>
    <v-dialog v-model="showSettingsDialog" max-width="800">
      <div style="height: 700px">
        <v-card class="px-10">
          <v-card-title>{{ chart.name }} - Edit chart</v-card-title>
          <v-card-text>
            <SettingsArea v-if="showSettingsDialog" v-model="config" />
            <v-btn color="error" @click="deleteChart(chart.id)"
              >Delete chart</v-btn
            >
          </v-card-text>
          <v-card-actions class="justify-end pb-4">
            <v-btn @click="showSettingsDialog = false" depressed>Close</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import SettingsArea from "@/components/SettingsArea";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ChartA } from "@/classes/customCharts/ChartA";
import { ChartB } from "@/classes/customCharts/ChartB";
import { mapGetters, mapMutations } from "vuex";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/apiRoutes";
import { ChartC } from "@/classes/customCharts/ChartC";
import { ChartD } from "@/classes/customCharts/ChartD";
import { ChartE } from "@/classes/customCharts/ChartE";

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
    async loadChartClass() {
      const chartTemplateName = this.chart.template;
      switch (chartTemplateName) {
        case "ChartA":
          this.chartObject = new ChartA();
          break;
        case "ChartB":
          this.chartObject = new ChartB();
          break;
        case "ChartC":
          this.chartObject = new ChartC();
          break;
        case "ChartD":
          this.chartObject = new ChartD();
          break;
        case "ChartE":
          this.chartObject = new ChartE();
          break;
        // case "ChartF":
        //   this.chartObject = new ChartF();
        //   break;
      }

      this.config = this.chartObject.createConfig(
        chartTemplateName,
        this.chart.config
      );
      this.configLoaded = true;
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

    async deleteChart(id) {
      const res = await apiRequest({
        path: API_ROUTES.CHART,
        method: "delete",
        data: {
          id,
        },
      });
      if (res?.success) {
        console.log("chart deleted successfully");
        await this.$store.dispatch("chart/fetchCharts");
      } else {
        console.error(`Error when try to delete chart id, ${id}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-chart {
  position: relative;
  &__button {
    position: absolute;
    top: -35px;
    right: 0;
  }
}
</style>
