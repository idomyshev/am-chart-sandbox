<template>
  <div class="container line-chart">
    <div class="header">
      <span class="title">Line Chart</span>
      <div style="display: flex; align-items: center">
        <v-select
          class="chart-select"
          :items="items"
          :value="items[0]"
          height="48"
          hide-details
          outlined
          background-color="#f8f8fa"
        ></v-select>
        <v-icon>mdi-dots-horizontal</v-icon>
      </div>
    </div>
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
      items: ["Last 30 Days"],
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

<style lang="scss">
.line-chart {
  .chart {
    height: 600px;
  }
  .chart-select {
    width: 160px;
    margin-right: 40px;
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
}
</style>
