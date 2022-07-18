<template>
  <div class="container">
    <div class="header">
      <span class="title">Waffle Chart</span>
      <div style="display: flex; align-items: center">
        <v-select
          v-model="colorSet"
          class="chart-select"
          :items="items"
          :value="items[0]"
          height="48"
          hide-details
          outlined
          background-color="#f8f8fa"
          @change="changeColor"
          item-text="title"
        ></v-select>
        <v-icon>mdi-dots-horizontal</v-icon>
      </div>
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
      colorSet: ["#9567d8", "#f560e6", "#ffb27d"],
      items: [
        { title: "Color Set 1", value: ["#9567d8", "#f560e6", "#ffb27d"] },
        { title: "Color Set 2", value: ["#ffcc2f", "#ef5734", "#00acee"] },
        { title: "Color Set 3", value: ["#005bbb", "#e56a54", "#ffc72c"] },
      ],
      series1: waffleSeries1,
      series2: waffleSeries2,
      series3: waffleSeries3,
      color1: "#9567d8",
      color2: "#f560e6",
      color3: "#ffb27d",
      root: null,
    };
  },
  mounted() {
    this.createChart();
  },

  methods: {
    changeColor() {
      console.log(111);
      if (this.checkbox) {
        this.color1 = "#9567d8";
        this.color2 = "#f560e6";
        this.color3 = "#ffb27d";
      } else {
        this.color1 = "#ffb27d";
        this.color2 = "#ffb27d";
        this.color3 = "#ffb27d";
      }
      this.createChart();
    },

    createChart() {
      if (this.root) {
        console.log("here");
        this.root.dispose();
      }
      let root = am5.Root.new(this.$refs.chartdivWaffle);
      this.root = root;

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
          centerX: am5.percent(50),
          x: am5.percent(50),
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
      root.interfaceColors.set("grid", "#fff");

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
            stroke: am5.color(0xffffff),
          })
        );

        series.columns.template.setAll({
          width: am5.percent(100),
          height: am5.percent(100),
          stroke: am5.color(0xffffff),
          cornerRadiusTL: 4,
          cornerRadiusTR: 4,
          cornerRadiusBL: 4,
          cornerRadiusBR: 4,
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

      let series1 = makeSeries("Democratic", this.colorSet[0]);
      series1.data.setAll(this.series1);

      let series2 = makeSeries("Republican", this.colorSet[1]);
      series2.data.setAll(this.series2);

      let series3 = makeSeries("Libertarian", this.colorSet[2]);
      series3.data.setAll(this.series3);
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    },
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
.chart-select {
  width: 200px;
  margin-right: 10px !important;
  border-radius: 10px;
}
.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 56px;
  display: flex !important;
  align-items: center !important;
}
.v-text-field--filled > .v-input__control > .v-input__slot,
.v-text-field--full-width > .v-input__control > .v-input__slot,
.v-text-field--outlined > .v-input__control > .v-input__slot {
  align-items: stretch;
  min-height: 48px !important;
}
.v-text-field--full-width .v-input__prepend-outer,
.v-text-field--full-width .v-input__prepend-inner,
.v-text-field--full-width .v-input__append-inner,
.v-text-field--full-width .v-input__append-outer,
.v-text-field--enclosed .v-input__prepend-outer,
.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field--enclosed .v-input__append-inner,
.v-text-field--enclosed .v-input__append-outer {
  margin-top: 11px;
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: #fff;
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state):not(.v-input--is-disabled)
  > .v-input__control
  > .v-input__slot:hover
  fieldset {
  color: unset;
}
</style>
