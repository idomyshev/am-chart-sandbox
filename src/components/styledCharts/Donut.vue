<template>
  <div class="container">
    <div class="header">
      <span class="title">Doughnut Chart</span>
      <v-icon>mdi-dots-horizontal</v-icon>
    </div>
    <div class="chart" ref="chartdivDonut" style="top: -45px" />
    <div class="legend" ref="donutLegend" />
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { donutData } from "@/components/styledCharts/mockData";

export default {
  name: "DonutChart",
  props: {
    msg: String,
  },
  data() {
    return {
      data: donutData,
    };
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdivDonut);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country",
      })
    );

    series
      .get("colors")
      .set("colors", [
        am5.color("#f560e6"),
        am5.color("#9567d8"),
        am5.color("#ffb27d"),
      ]);
    series.data.setAll(this.data);

    // Disabling labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    let legendRoot = am5.Root.new(this.$refs.donutLegend);

    let legend = legendRoot.container.children.push(
      am5.Legend.new(legendRoot, {
        width: am5.percent(50),
        centerX: am5.percent(0),
        x: am5.percent(25),
        y: am5.percent(35),
        layout: am5.GridLayout.new(root, {
          maxColumns: 3,
          fixedWidthGrid: true,
        }),
      })
    );

    legend.labels.template.setAll({
      text: "country",
      fontSize: 15,
      fontWeight: "500",
    });

    legend.valueLabels.template.setAll({
      text: "{country}",
      fontSize: 15,
      fontWeight: "500",
    });

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    legend.data.setAll(series.dataItems);
  },
};
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
