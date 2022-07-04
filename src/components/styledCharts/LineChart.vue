<template>
  <div class="container">
    <span class="title">Line Chart</span>
    <div class="chart" ref="chartdivLine" />
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { lineData, lineData2 } from "@/components/styledCharts/mockData";

export default {
  name: "LineChart",
  props: {
    msg: String,
  },
  data() {
    return {
      data: lineData,
      data2: lineData2,
    };
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdivLine);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
      })
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 10,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    let series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        stroke: "#f560e6",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );

    let series2 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        stroke: "#9567d8",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 3,
    });

    series2.strokes.template.setAll({
      strokeWidth: 3,
    });

    series.data.setAll(this.data);
    series2.data.setAll(this.data2);

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    // Make stuff animate on load
    // series.appear(1000, 100);
    chart.appear(1000, 100);
  },
};
</script>

<style scoped>
.chart {
  height: 600px;
}
</style>
