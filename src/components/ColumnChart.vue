<template>
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
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { diagramsMockData } from "@/mockData/diagramsData";
import { columnChartConfig } from "@/settings/charts/columnChartConfig";
import SettingsArea from "@/components/SettingsArea";

export default {
  name: "ColumnChart",
  components: { SettingsArea },
  data() {
    return {
      chartSettings: columnChartConfig(),
      showGrid: true,
      showGridAboveSeries: false,
      showTicks: true,
      showYLabels: true,
      showXLabels: true,
    };
  },
  mounted() {
    this.initDiagram();
  },

  watch: {
    chartSettings: {
      handler() {
        this.initDiagram();
        console.log("updated");
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

      let root = am5.Root.new(this.$refs.amChart);

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: true,
          layout: root.verticalLayout,
        })
      );

      // Y-axis
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: this.chartSettings.axisY.items.strokeOpacity.value,
            strokeWidth: this.chartSettings.axisY.items.strokeWidth.value,
            stroke: am5.color(
              `#${this.chartSettings.axisY.items.stroke.value}`
            ),
          }),
        })
      );

      // X-Axis
      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: this.chartSettings.axisX.items.strokeOpacity.value,
            strokeWidth: this.chartSettings.axisX.items.strokeWidth.value,
            stroke: am5.color(
              `#${this.chartSettings.axisX.items.stroke.value}`
            ),
          }),
          categoryField: "month",
          startLocation: this.chartSettings.axisX.items.startLocation.value,
          endLocation: this.chartSettings.axisX.items.endLocation.value,
        })
      );

      xAxis.data.setAll(diagramsMockData);

      // if (this.chartSettings.gridY.items.enabled.value) {
      //   const yRenderer = yAxis.get("renderer");
      //   yRenderer.grid.template.setAll({
      //     stroke: am5.color(`#${this.chartSettings.gridY.items.stroke.value}`),
      //     strokeWidth: this.chartSettings.gridY.items.strokeWidth.value,
      //   });
      // }
      // if (this.chartSettings.gridX.items.enabled.value) {
      //   const xRenderer = xAxis.get("renderer");
      //   xRenderer.grid.template.setAll({
      //     stroke: am5.color(`#${this.chartSettings.gridX.items.stroke.value}`),
      //     strokeWidth: this.chartSettings.gridX.items.strokeWidth.value,
      //   });
      // }

      // if (this.showTicks) {
      //   yRenderer.ticks.template.setAll({
      //     stroke: am5.color("#0f0"),
      //     visible: true,
      //   });
      // }
      //
      // if (this.showYLabels) {
      //   yRenderer.labels.template.setAll({
      //     fill: am5.color("rgb(0, 0, 0)"),
      //     fontSize: "1em",
      //   });
      // }
      //
      // // const xRenderer = xAxis.get("renderer");
      // // xRenderer.grid.template.setAll({
      // //   stroke: am5.color("#fff"),
      // //   strokeWidth: 1,
      // // });
      //
      // if (this.showXLabels) {
      //   xRenderer.labels.template.setAll({
      //     fill: am5.color("rgb(0, 0, 0)"),
      //     fontSize: "1em",
      //   });
      // }

      if (this.showGridAboveSeries) {
        chart.gridContainer.toFront();
      }

      // Food
      let food = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Food",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "food",
          categoryXField: "month",
        })
      );

      // Cafe
      let cafe = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Cafe",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "cafe",
          categoryXField: "month",
        })
      );

      food.data.setAll(diagramsMockData);
      cafe.data.setAll(diagramsMockData);

      // Legend
      let legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);

      // Cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;
    },
  },
  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>
<style lang="scss" scoped></style>
