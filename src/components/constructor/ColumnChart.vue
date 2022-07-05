<template>
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
    };
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

      // yAxis
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: this.chartSettings.axes.y.strokeOpacity.value,
            strokeWidth: this.chartSettings.axes.y.strokeWidth.value,
            stroke: am5.color(`#${this.chartSettings.axes.y.stroke.value}`),
          }),
        })
      );

      // xAxis
      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {
            strokeOpacity: this.chartSettings.axes.x.strokeOpacity.value,
            strokeWidth: this.chartSettings.axes.x.strokeWidth.value,
            stroke: am5.color(`#${this.chartSettings.axes.x.stroke.value}`),
          }),
          categoryField: "month",
          startLocation: this.chartSettings.axes.x.startLocation.value,
          endLocation: this.chartSettings.axes.x.endLocation.value,
        })
      );

      xAxis.data.setAll(diagramsMockData);

      // Renderers.
      const yRenderer = yAxis.get("renderer");
      const xRenderer = xAxis.get("renderer");

      // Grid Y.
      yRenderer.grid.template.setAll({
        stroke: am5.color(`#${this.chartSettings.grid.y.stroke.value}`),
        strokeWidth: this.chartSettings.grid.y.strokeWidth.value,
      });

      // Grid X.
      xRenderer.grid.template.setAll({
        stroke: am5.color(`#${this.chartSettings.grid.x.stroke.value}`),
        strokeWidth: this.chartSettings.grid.x.strokeWidth.value,
      });

      if (this.chartSettings.grid._noSubGroup.gridContainerToFront.value) {
        chart.gridContainer.toFront();
      }

      // Ticks Y.
      yRenderer.ticks.template.setAll({
        stroke: am5.color(`#${this.chartSettings.ticks.y.stroke.value}`),
        strokeWidth: this.chartSettings.ticks.y.strokeWidth.value,
        visible: this.chartSettings.ticks.y.enabled.value,
      });

      // Ticks X.
      xRenderer.ticks.template.setAll({
        stroke: am5.color(`#${this.chartSettings.ticks.x.stroke.value}`),
        strokeWidth: this.chartSettings.ticks.x.strokeWidth.value,
        visible: this.chartSettings.ticks.x.enabled.value,
      });

      // Labels Y.
      yRenderer.labels.template.setAll({
        fill: am5.color(`#${this.chartSettings.labels.y.fill.value}`),
        fontSize: `${this.chartSettings.labels.y.fontSize.value}em`,
      });

      // Labels X.
      xRenderer.labels.template.setAll({
        fill: am5.color(`#${this.chartSettings.labels.x.fill.value}`),
        fontSize: `${this.chartSettings.labels.x.fontSize.value}em`,
        radius: 30,
      });

      // Food series.
      let food = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Food",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "food",
          categoryXField: "month",
        })
      );

      // Legend.
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(this.chartSettings.legend.food.centerX.value),
          x: am5.percent(this.chartSettings.legend.food.x.value),
          y: am5.percent(this.chartSettings.legend.food.y.value),
          layout: root.horizontalLayout,
        })
      );
      legend.data.setAll(chart.series.values);

      // Cursor
      if (this.chartSettings.cursor._noSubGroup.enabled.value) {
        chart.set("cursor", am5xy.XYCursor.new(root, {}));
      }

      // Cafe series.
      let cafe = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Cafe",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "cafe",
          categoryXField: "month",
        })
      );

      cafe.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 35,
            fill: "#fff",
            strokeWidth: 2,
            stroke: "#f00",
          }),
        });
      });

      food.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 35,
            fill: "#fff",
            strokeWidth: 2,
            stroke: "#00f",
          }),
        });
      });

      food.data.setAll(diagramsMockData);
      cafe.data.setAll(diagramsMockData);

      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped></style>
