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

export default {
  name: "LineChart",
  props: {
    msg: String,
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdivLine);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    let data = [
      {
        date: new Date(2012, 1, 1).getTime(),
        value: 8,
      },
      {
        date: new Date(2012, 1, 2).getTime(),
        value: 5,
      },
      {
        date: new Date(2012, 1, 3).getTime(),
        value: 12,
        strokeSettings: {
          stroke: am5.color(0x990000),
          strokeDasharray: [3, 3],
        },
      },
      {
        date: new Date(2012, 1, 4).getTime(),
        value: 14,
      },
      {
        date: new Date(2012, 1, 5).getTime(),
        value: 11,
      },
      {
        date: new Date(2012, 1, 6).getTime(),
        value: 2,
      },
      {
        date: new Date(2012, 1, 7).getTime(),
        value: 12,
      },
      {
        date: new Date(2012, 1, 8).getTime(),
        value: 5,
      },
      {
        date: new Date(2012, 1, 9).getTime(),
        value: 1,
      },
      {
        date: new Date(2012, 1, 10).getTime(),
        value: 8,
      },
    ];

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

    series.strokes.template.setAll({
      strokeWidth: 3,
    });

    series.data.setAll(data);

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    // Make stuff animate on load
    series.appear(1000, 100);
    chart.appear(1000, 100);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  margin: 10px 0px;
}
.chart {
  height: 600px;
}
.legend {
  height: 100px;
  align-items: center;
}
.title {
  align-self: flex-start;
  font-weight: 700;
  font-size: 30px;
  padding-bottom: 50px;
  padding-left: 20px;
}
</style>
