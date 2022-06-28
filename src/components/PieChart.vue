<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="diagram-page">
    <div class="diagram-settings">
      <div class="diagram-settings__line">
        <v-switch v-model="settings.customColors" label="Custom colors" />
        <v-switch v-model="settings.customLabels" label="Custom labels" />
        <v-switch
          v-model="settings.seriesCustomStyle"
          label="Series custom style"
        />
        <v-switch
          v-model="settings.customStyleOnSliceClick"
          label="Custom style on slice click"
        />
        <v-switch
          v-model="settings.enableSliceClick"
          label="Enable action on slice click"
        />
      </div>
      <div class="diagram-settings__line">
        <v-text-field v-model="settings.diagramRadius" label="Radius" />
        <v-text-field
          v-model="settings.diagramInnerRadius"
          label="Inner radius"
        />
        <v-text-field v-model="settings.sliceOpacity" label="Slice opacity" />
        <v-text-field
          v-model="settings.sliceBorderColor"
          label="Border color (#)"
        />
        <v-text-field
          v-model="settings.sliceBorderWidth"
          label="Border width"
        />
      </div>
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
        customColors: true,
        customLabels: true,
        seriesCustomStyle: true,
        customStyleOnSliceClick: true,
        enableSliceClick: true,
        diagramRadius: 80,
        diagramInnerRadius: 55,
        sliceBorderWidth: 3,
        sliceOpacity: 1,
        sliceBorderColor: "fff",
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
        console.log("updated");
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
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          radius: am5.percent(this.settings.diagramRadius),
          innerRadius: am5.percent(this.settings.diagramInnerRadius),
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

      if (this.settings.customLabels) {
        series.labels.template.setAll({
          text: "{category}",
          radius: 70,
          inside: true,
          textType: "circular",
          // centerX: am5.percent(10),
        });
      }

      if (this.settings.seriesCustomStyle) {
        series.slices.template.setAll({
          fillOpacity: this.settings.sliceOpacity,
          stroke: am5.color(`#${this.settings.sliceBorderColor}`),
          strokeWidth: this.settings.sliceBorderWidth,
        });
      }

      if (!this.settings.enableSliceClick) {
        series.slices.template.set("toggleKey", "none"); // Disable slice shift on click.
      }

      if (this.settings.customStyleOnSliceClick) {
        series.slices.template.states.create("active", {
          shiftRadius: 20,
          stroke: am5.color(0x00ff00),
          strokeWidth: 2,
        });
      }

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
<style lang="scss" scoped></style>
