<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5">
      <SettingsArea v-model="chartSettings" />
    </v-col>
    <v-col cols="7">
      <div class="am-charts-container" ref="amChart"></div>
    </v-col>
  </v-row>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import SettingsArea from "@/components/SettingsArea";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { lineChartConfig } from "@/settings/charts/lineChartConfig";

export default {
  name: "LineChart",
  components: { SettingsArea },
  computed: {},
  data() {
    return {
      chartSettings: lineChartConfig(),
      showGrid: true,
      showGridAboveSeries: false,
      showTicks: true,
      showYLabels: true,
      showXLabels: true,
    };
  },
  created() {},
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
      am5.ready(() => {
        this.createDiagram();
      });
    },
    createDiagram() {
      if (this.root) {
        this.root.dispose();
      }
      const root = am5.Root.new(this.$refs.amChart, {
        useSafeResolution: false,
      });

      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        })
      );

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "none",
        })
      );
      cursor.lineY.set("visible", false);

      // Generate random data
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      let value = 100;

      function generateData() {
        value = Math.round(Math.random() * 10 - 5 + value);
        am5.time.add(date, "day", 1);
        return {
          date: date.getTime(),
          value: value,
        };
      }

      function generateDatas(count) {
        let data = [];
        for (var i = 0; i < count; ++i) {
          data.push(generateData());
        }
        return data;
      }

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.2,
          baseInterval: {
            timeUnit: "day",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set(
        "scrollbarX",
        am5.Scrollbar.new(root, {
          orientation: "horizontal",
        })
      );

      // Set data
      let data = generateDatas(1200);
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped></style>
