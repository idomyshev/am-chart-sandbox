<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="am-charts-container" ref="amChart"></div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: "ColumnsCharts",
  data() {
    return {
      showGrid: true,
      showGridAboveSeries: false,
      showTicks: true,
      showYLabels: true,
      showXLabels: true,
    };
  },
  mounted() {
    let root = am5.Root.new(this.$refs.amChart);

    // const myTheme = am5.Theme.new(root);
    //
    // myTheme.rule("Grid", ["base"]).setAll({
    //   strokeOpacity: 0,
    // });
    // root.setThemes([myTheme]);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: true,
        layout: root.verticalLayout,
      })
    );

    // Data
    let data = [
      {
        month: "March",
        cafe: 1000,
        food: 3000,
      },
      {
        month: "April",
        cafe: 1500,
        food: 2000,
      },
      {
        month: "May",
        cafe: 2600,
        food: 1000,
      },
    ];

    // Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.5,
          strokeWidth: 2,
          color: "#666",
        }),
      })
    );

    // X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "month",
        // startLocation: 0.5,
        // endLocation: 0.5,
      })
    );

    xAxis.data.setAll(data);

    if (this.showGrid) {
      const yRenderer = yAxis.get("renderer");
      yRenderer.grid.template.setAll({
        stroke: am5.color("#fff"),
        strokeWidth: 1,
      });

      if (this.showTicks) {
        yRenderer.ticks.template.setAll({
          stroke: am5.color("#0f0"),
          visible: true,
        });
      }

      if (this.showYLabels) {
        yRenderer.labels.template.setAll({
          fill: am5.color("rgb(160, 170, 150)"),
          fontSize: "1em",
        });
      }

      const xRenderer = xAxis.get("renderer");
      xRenderer.grid.template.setAll({
        stroke: am5.color("#fff"),
        strokeWidth: 1,
      });

      if (this.showXLabels) {
        xRenderer.labels.template.setAll({
          fill: am5.color("rgb(160, 170, 170)"),
          fontSize: "1em",
        });
      }
    }

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

    food.data.setAll(data);
    cafe.data.setAll(data);

    // Legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>
<style lang="scss" scoped>
.am-charts-container {
  max-width: 1000px;
  height: 650px;
  margin: 150px auto 0;
}
</style>
