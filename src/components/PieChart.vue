<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="diagram-page">
    <div class="diagram-settings">
      <v-switch v-model="settings.customColors" label="Custom colors" />
    </div>

    <div class="am-charts-container" ref="amChart"></div>
  </div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { diagramsMockData } from "@/mockData/diagramsData";

export default {
  name: "PieChart",
  data() {
    return {
      showGrid: true,
      showGridAboveSeries: false,
      showTicks: true,
      showYLabels: true,
      showXLabels: true,
      settings: {
        customColors: false,
      },
    };
  },
  mounted() {
    this.initDiagram();
  },

  beforeDestroy() {},

  watch: {
    settings: {
      handler() {
        this.initDiagram();
      },
      deep: true,
    },
  },

  methods: {
    initDiagram() {
      if (this.root) {
        this.root.dispose();
      }

      const root = am5.Root.new(this.$refs.amChart, {
        useSafeResolution: false,
      });
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          radius: am5.percent(90),
          innerRadius: am5.percent(55),
        })
      );

      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "cafe",
          categoryField: "month",
          alignLabels: false,
        })
      );

      series.labels.template.setAll({
        text: "{category}",
        radius: 70,
        inside: true,
        textType: "circular",
        // centerX: am5.percent(10),
      });

      series.slices.template.setAll({
        fillOpacity: 1, // Opacity for the slices.
        stroke: am5.color(0xffffff),
        strokeWidth: 3, // Border for the slices.
      });

      // series.slices.template.set("toggleKey", "none"); // Disable slice shift on click.

      series.slices.template.states.create("active", {
        shiftRadius: 20,
        stroke: am5.color(0x666666),
        strokeWidth: 2,
      });

      // series.labels.template.set("forceHidden", true);

      if (this.settings.customColors) {
        series
          .get("colors")
          .set("colors", [
            am5.color(0x095256),
            am5.color(0x087f8c),
            am5.color(0x5aaa95),
            am5.color(0x86a873),
            am5.color(0xbb9f06),
          ]);
      }

      series.data.setAll(diagramsMockData);

      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          y: am5.percent(1),
          layout: root.horizontalLayout,
        })
      );
      legend.data.setAll(series.dataItems);

      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped>
.am-charts-container {
  max-width: 1000px;
  height: 650px;
  margin: 0 auto;
}
</style>
