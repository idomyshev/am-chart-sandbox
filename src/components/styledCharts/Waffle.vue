<template>
  <div class="container">
    <span class="title">Waffle Chart</span>
    <div class="chart" ref="chartdivWaffle" />
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: "WaffleChart",
  props: {
    msg: String,
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdivWaffle);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: 265,
        width: 500,
      })
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "x",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 10,
        }),
      })
    );

    xAxis.get("renderer").labels.template.set("forceHidden", true);

    xAxis.data.setAll([
      { x: "1" },
      { x: "2" },
      { x: "3" },
      { x: "4" },
      { x: "5" },
      { x: "6" },
      { x: "7" },
      { x: "8" },
      { x: "9" },
      { x: "10" },
    ]);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "y",
        renderer: am5xy.AxisRendererY.new(root, {}),
        height: am5.percent(100),
      })
    );

    yAxis.get("renderer").labels.template.set("forceHidden", true);

    yAxis.data.setAll([
      { y: "1" },
      { y: "2" },
      { y: "3" },
      { y: "4" },
      { y: "5" },
      { y: "6" },
      { y: "7" },
      { y: "8" },
      { y: "9" },
      { y: "10" },
    ]);

    // Add series
    function makeSeries(name, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          categoryYField: "y",
          openCategoryYField: "y",
          categoryXField: "x",
          openCategoryXField: "x",
          clustered: false,
          fill: color,
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        height: am5.percent(100),
        stroke: am5.color(0xffffff),
      });

      series.appear();
      legend.data.push(series);

      return series;
    }

    let series1 = makeSeries("Democratic", "#9567d8");
    series1.data.setAll([
      { x: "1", y: "1" },
      { x: "1", y: "2" },
      { x: "1", y: "3" },
      { x: "1", y: "4" },
      { x: "1", y: "5" },
      { x: "1", y: "6" },
      { x: "1", y: "7" },
      { x: "1", y: "8" },
      { x: "1", y: "9" },
      { x: "1", y: "10" },

      { x: "2", y: "1" },
      { x: "2", y: "2" },
      { x: "2", y: "3" },
      { x: "2", y: "4" },
      { x: "2", y: "5" },
      { x: "2", y: "6" },
      { x: "2", y: "7" },
      { x: "2", y: "8" },
      { x: "2", y: "9" },
      { x: "2", y: "10" },

      { x: "3", y: "1" },
      { x: "3", y: "2" },
      { x: "3", y: "3" },
    ]);

    let series2 = makeSeries("Republican", "#f560e6");
    series2.data.setAll([
      { x: "3", y: "4" },
      { x: "3", y: "5" },
      { x: "3", y: "6" },
      { x: "3", y: "7" },
      { x: "3", y: "8" },
      { x: "3", y: "9" },
      { x: "3", y: "10" },

      { x: "4", y: "1" },
      { x: "4", y: "2" },
      { x: "4", y: "3" },
      { x: "4", y: "4" },
      { x: "4", y: "5" },
      { x: "4", y: "6" },
      { x: "4", y: "7" },
      { x: "4", y: "8" },
      { x: "4", y: "9" },
      { x: "4", y: "10" },

      { x: "5", y: "1" },
      { x: "5", y: "2" },
      { x: "5", y: "3" },
      { x: "5", y: "4" },
      { x: "5", y: "5" },
      { x: "5", y: "6" },
    ]);

    let series3 = makeSeries("Libertarian", "#ffb27d");
    series3.data.setAll([
      { x: "5", y: "7" },
      { x: "5", y: "8" },
      { x: "5", y: "9" },
      { x: "5", y: "10" },

      { x: "6", y: "1" },
      { x: "6", y: "2" },
      { x: "6", y: "3" },
      { x: "6", y: "4" },
      { x: "6", y: "5" },
      { x: "6", y: "6" },
      { x: "6", y: "7" },
      { x: "6", y: "8" },
      { x: "6", y: "9" },
      { x: "6", y: "10" },

      { x: "7", y: "1" },
      { x: "7", y: "2" },
      { x: "7", y: "3" },
      { x: "7", y: "4" },
      { x: "7", y: "5" },
      { x: "7", y: "6" },
      { x: "7", y: "7" },
      { x: "7", y: "8" },
      { x: "7", y: "9" },
    ]);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: 10px 0;
  margin-right: 10px;
}
.chart {
  height: 340px;
}
.legend {
  height: 100px;
  align-items: center;
}
.title {
  padding-left: 20px;
  align-self: flex-start;
  font-weight: 700;
  font-size: 30px;
}
</style>
