<template>
  <div class="container">
    <div class="header">
      <span class="title">Waffle Chart</span>
      <v-icon>mdi-dots-horizontal</v-icon>
    </div>
    <div class="chart" ref="chartdivWaffle" />
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {
  waffleSeries1,
  waffleSeries2,
  waffleSeries3,
} from "@/components/styledCharts/mockData";

export default {
  name: "WaffleChart",
  props: {
    msg: String,
  },
  data() {
    return {
      series1: waffleSeries1,
      series2: waffleSeries2,
      series3: waffleSeries3,
    };
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

      legend.labels.template.setAll({
        text: "category",
        fontSize: 15,
        fontWeight: "500",
      });

      legend.valueLabels.template.setAll({
        text: "{category}",
        fontSize: 15,
        fontWeight: "500",
      });
      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10,
      });
      legend.data.push(series);

      return series;
    }

    let series1 = makeSeries("Democratic", "#9567d8");
    series1.data.setAll(this.series1);

    let series2 = makeSeries("Republican", "#f560e6");
    series2.data.setAll(this.series2);

    let series3 = makeSeries("Libertarian", "#ffb27d");
    series3.data.setAll(this.series3);
  },
};
</script>

<style scoped>
.chart {
  height: 340px;
}
.title {
  display: flex;
}
.title:before {
  display: inline-block;
  content: "";
  width: 8px;
  height: 30px;
  background-color: #000;
  margin-right: 10px;
  border-radius: 10px;
}
</style>
