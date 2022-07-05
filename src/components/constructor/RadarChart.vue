<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5">
      <SettingsArea v-model="chartSettings" />
    </v-col>
    <v-col cols="7">
      <div class="chart-wrapper">
        <div class="am-charts-container" ref="amChart"></div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import { radarMockData } from "@/mockData/diagramsData";
import SettingsArea from "@/components/SettingsArea";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { radarChartConfig } from "@/settings/charts/radarChartConfig";

export default {
  name: "RadarChart",

  components: { SettingsArea },

  data() {
    return {
      chartSettings: radarChartConfig(),
    };
  },

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

      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      let chart = root.container.children.push(
        am5radar.RadarChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
        })
      );

      // Add cursor
      let cursor = chart.set(
        "cursor",
        am5radar.RadarCursor.new(root, {
          behavior: "zoomX",
        })
      );

      cursor.lineY.set("visible", false);

      // Create axes and their renderers
      let xRenderer = am5radar.AxisRendererCircular.new(root, {});
      xRenderer.labels.template.setAll({
        fill: am5.color(`#999`),
        radius: this.chartSettings.labels._noSubGroup.radius.value,
        fontSize: `15px`,
      });

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 200,
          categoryField: "country",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5radar.AxisRendererRadial.new(root, {}),
        })
      );

      // Create series
      let series = chart.series.push(
        am5radar.RadarLineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "litres",
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: this.chartSettings.strokes._noSubGroup.strokeWidth.value,
      });

      // series.bullets.push(() => {
      //   return am5.Bullet.new(root, {
      //     sprite: am5.Circle.new(root, {
      //       radius: this.chartSettings.bullets._noSubGroup.radius.value,
      //       fill: series.get("fill"),
      //     }),
      //   });
      // });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: "#fff",
            strokeWidth: 2,
            stroke: "#f00",
          }),
        });
      });

      let range2 = xAxis.createAxisRange(
        xAxis.makeDataItem({
          category: "UK",
        })
      );
      range2.get("axisFill").setAll({
        visible: true,
        fill: am5.color(0x0000ff),
        fillOpacity: 0.1,
      });
      let range3 = xAxis.createAxisRange(
        xAxis.makeDataItem({
          category: "Belgium",
        })
      );
      range3.get("axisFill").setAll({
        visible: true,
        fill: am5.color(0x00ff00),
        fillOpacity: 0.1,
      });

      series.data.setAll(radarMockData);
      xAxis.data.setAll(radarMockData);

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
