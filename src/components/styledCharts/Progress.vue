<template>
  <div class="container">
    <span class="title">Progress Chart</span>
    <div class="chart" ref="chartdivDonut" />
    <div class="legend" ref="donutLegend" />
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";

export default {
  name: "ProgressChart",
  props: {
    msg: String,
  },
  mounted() {
    // Create root element
    var root = am5.Root.new(this.$refs.chartdivDonut);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        innerRadius: am5.percent(70),
        startAngle: 270,
        endAngle: 630,
      })
    );

    // Data
    var data = [
      {
        category: "Research",
        value: 20,
        full: 100,
        columnSettings: {
          fill: "#9567d8",
        },
      },
      {
        category: "Marketing",
        value: 90,
        full: 100,
        columnSettings: {
          fill: "#f560e6",
        },
      },
    ];

    // Create axes and their renderers
    var xRenderer = am5radar.AxisRendererCircular.new(root, {
      visible: false,
    });

    xRenderer.labels.template.setAll({
      radius: 10,
      forceHidden: true,
    });

    xRenderer.grid.template.setAll({
      forceHidden: true,
    });

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
      })
    );

    var yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20,
    });

    yRenderer.grid.template.setAll({
      forceHidden: true,
    });

    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
        visible: false,
      })
    );

    yAxis.data.setAll(data);

    // Create series
    var series1 = chart.series.push(
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

    series1.data.setAll(data);

    var series2 = chart.series.push(
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

    series2.data.setAll(data);
    var legendRoot = am5.Root.new(this.$refs.donutLegend);

    var legend = legendRoot.container.children.push(
      am5.Legend.new(legendRoot, {
        width: am5.percent(50),
        centerX: am5.percent(0),
        x: am5.percent(30),
        y: am5.percent(35),
        layout: am5.GridLayout.new(root, {
          maxColumns: 3,
          fixedWidthGrid: true,
        }),
      })
    );

    legend.data.setAll(series1.chart.series.values);

    // Animate chart and series in
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
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
}
.chart {
  height: 300px;
}
.legend {
  height: 100px;
  align-items: center;
}
.title {
  align-self: flex-start;
  font-weight: 700;
  font-size: 30px;
  padding-left: 20px;
}
</style>
