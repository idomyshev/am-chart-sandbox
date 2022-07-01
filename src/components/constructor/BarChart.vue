<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5">
      <SettingsArea v-model="chartSettings" />
    </v-col>
    <v-col cols="7">
      <div class="am-charts-container" ref="amChart"></div>
    </v-col>
  </v-row>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import { barMockData } from "@/mockData/diagramsData";
import SettingsArea from "@/components/SettingsArea";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { barChartConfig } from "@/settings/charts/barChartConfig";

export default {
  name: "BarChart",
  components: { SettingsArea },
  computed: {},
  data() {
    return {
      chartSettings: barChartConfig(),
    };
  },
  created() {},
  mounted() {
    this.initDiagram();
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },

  watch: {
    chartSettings: {
      handler() {
        this.initDiagram();
        console.log("settings updated");
      },
      deep: true,
    },
  },

  methods: {
    initDiagram() {
      am5.ready(() => {
        this.createDiagram();
      });
    },
    createDiagram() {
      if (this.root) {
        this.root.dispose();
      }
      const root = am5.Root.new(this.$refs.amChart, {
        useSafeResolution: false,
      });

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
        })
      );

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });

      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          categoryField: "country",
          renderer: yRenderer,
        })
      );

      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0,
          min: 0,
          renderer: am5xy.AxisRendererX.new(root, {}),
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "value",
          sequencedInterpolation: true,
          categoryYField: "country",
        })
      );

      let columnTemplate = series.columns.template;

      columnTemplate.setAll({
        draggable:
          this.chartSettings.columnTemplate._noSubGroup.draggable.value,
        cursorOverStyle:
          this.chartSettings.columnTemplate._noSubGroup.cursorOverStyle.value,
        tooltipText:
          this.chartSettings.columnTemplate._noSubGroup.tooltipText.value,
        cornerRadiusBR:
          this.chartSettings.columnTemplate._noSubGroup.cornerRadiusBR.value,
        cornerRadiusTR:
          this.chartSettings.columnTemplate._noSubGroup.cornerRadiusTR.value,
      });
      columnTemplate.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      columnTemplate.adapters.add("stroke", (stroke, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      columnTemplate.events.on("dragstop", () => {
        sortCategoryAxis(this.chartSettings);
      });

      // Get series item by category
      function getSeriesItem(category) {
        for (var i = 0; i < series.dataItems.length; i++) {
          let dataItem = series.dataItems[i];
          if (dataItem.get("categoryY") == category) {
            return dataItem;
          }
        }
      }

      // Axis sorting
      function sortCategoryAxis(chartSettings) {
        // Sort by value
        series.dataItems.sort(function (x, y) {
          return y.get("graphics").y() - x.get("graphics").y();
        });

        let easing = am5.ease.out(am5.ease.cubic);

        // Go through each axis item
        am5.array.each(yAxis.dataItems, function (dataItem) {
          // get corresponding series item
          let seriesDataItem = getSeriesItem(dataItem.get("category"));

          if (seriesDataItem) {
            // get index of series data item
            let index = series.dataItems.indexOf(seriesDataItem);

            let column = seriesDataItem.get("graphics");

            // position after sorting
            let fy =
              yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
              column.height() / 2;

            // set index to be the same as series data item index
            if (index != dataItem.get("index")) {
              dataItem.set("index", index);

              // current position
              let x = column.x();
              let y = column.y();

              column.set("dy", -(fy - y));
              column.set("dx", x);

              column.animate({
                key: "dy",
                to: 0,
                duration:
                  chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
                easing: easing,
              });
              column.animate({
                key: "dx",
                to: 0,
                duration:
                  chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
                easing: easing,
              });
            } else {
              column.animate({
                key: "y",
                to: fy,
                duration:
                  chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
                easing: easing,
              });
              column.animate({
                key: "x",
                to: 0,
                duration:
                  chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
                easing: easing,
              });
            }
          }
        });

        // Sort axis items by index.
        // This changes the order instantly, but as dx and dy is set and animated,
        // they keep in the same places and then animate to true positions.
        yAxis.dataItems.sort(function (x, y) {
          return x.get("index") - y.get("index");
        });
      }

      yAxis.data.setAll(barMockData);
      series.data.setAll(barMockData);

      // Animation.
      series.appear(
        this.chartSettings.animation._noSubGroup.seriesAppear.value
      );
      chart.appear(
        this.chartSettings.animation._noSubGroup.chartOpacityAppear.value,
        this.chartSettings.animation._noSubGroup.chartAppear.value
      );

      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped></style>
