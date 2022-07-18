<template>
  <div class="container">
    <div class="header">
      <span class="title">Progress Chart</span>
      <v-icon>mdi-dots-horizontal</v-icon>
    </div>
    <div class="chart" ref="chartdivDonut" />
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { progressData } from "@/components/styledCharts/mockData";

export default {
  name: "ProgressChart",
  props: {
    msg: String,
  },
  data() {
    return {
      data: progressData,
    };
  },
  mounted() {
    // Create root element
    let root = am5.Root.new(this.$refs.chartdivDonut);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        innerRadius: am5.percent(70),
        startAngle: 270,
        endAngle: 630,
      })
    );

    // Create axes and their renderers
    let xRenderer = am5radar.AxisRendererCircular.new(root, {
      visible: false,
    });

    xRenderer.labels.template.setAll({
      radius: 10,
      forceHidden: true,
    });

    xRenderer.grid.template.setAll({
      forceHidden: true,
    });

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
      })
    );

    let yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20,
    });

    yRenderer.grid.template.setAll({
      forceHidden: true,
    });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
        visible: false,
      })
    );

    yAxis.data.setAll(this.data);

    // Create series
    let series1 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "full",
        categoryYField: "category",
        fill: root.interfaceColors.get("alternativeBackground"),
      })
    );

    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20,
    });

    series1.data.setAll(this.data);

    let series2 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "value",
        categoryYField: "category",
      })
    );

    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings",
    });

    series2.data.setAll(this.data);
    let legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: "valueX",
        centerX: am5.percent(50),
        x: am5.percent(50),
        y: am5.percent(96),
        layout: am5.GridLayout.new(root, {
          maxColumns: 2,
          fixedWidthGrid: true,
        }),
      })
    );
    legend.labels.template.setAll({
      text: "category",
      fontSize: 15,
      fontWeight: "500",
    });

    legend.valueLabels.template.setAll({
      text: "{category}",
      fontSize: 15,
      fontWeight: "500",
      marginRight: 20,
    });

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });
    legend.data.setAll(series2.dataItems);

    // Animate chart and series in
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
  },
};
</script>

<style scoped>
.container {
  height: 400px;
}
.chart {
  height: 340px;
}
</style>
