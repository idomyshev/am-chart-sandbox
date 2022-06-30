<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5">
      <SettingsArea v-model="chartSettings" />
    </v-col>
    <v-col cols="7">
      <div class="am-charts-container" ref="amChart"></div>
      <v-btn v-if="false" @click="initDiagram">Init again</v-btn>
    </v-col>
  </v-row>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { diagramsMockData } from "@/mockData/diagramsData";
import SettingsArea from "@/components/SettingsArea";
import { pieChartConfig } from "@/settings/charts/pieChartConfig";

export default {
  name: "PieChart",
  components: { SettingsArea },
  computed: {},
  data() {
    return {
      chartSettings: pieChartConfig(),
      showGrid: true,
      showGridAboveSeries: false,
      showTicks: true,
      showYLabels: true,
      showXLabels: true,
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
          radius: am5.percent(
            this.chartSettings.chart.no_subGroup.radius.value
          ),
          innerRadius: am5.percent(
            this.chartSettings.chart.no_subGroup.innerRadius.value
          ),
        })
      );

      const cafeSeries = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "cafe",
          categoryField: "month",
          alignLabels: false,
        })
      );

      // Second series.
      let foodSeries = null;
      if (this.chartSettings.series.food.enabled.value) {
        foodSeries = chart.series.push(
          am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "food",
            categoryField: "month",
            alignLabels: false,
            startAngle: this.chartSettings.series.food.startAngle.value,
            endAngle: this.chartSettings.series.food.endAngle.value,
          })
        );
      }

      // Ticks.
      if (!this.chartSettings.ticks.cafe.enabled.value) {
        cafeSeries.ticks.template.set("visible", false);
      } else {
        cafeSeries.ticks.template.setAll({
          stroke: am5.color(`#${this.chartSettings.ticks.cafe.color.value}`),
          strokeWidth: this.chartSettings.ticks.cafe.width.value,
        });
      }

      // Labels.
      if (!this.chartSettings.labels.cafe.enabled.value) {
        cafeSeries.labels.template.set("forceHidden", true);
      } else {
        cafeSeries.labels.template.setAll({
          text: "{category}",
          radius: this.chartSettings.labels.cafe.radius.value,
          inside: this.chartSettings.labels.cafe.inside.value,
          textType: this.chartSettings.labels.cafe.circular.value
            ? "circular"
            : undefined,
          // centerX: am5.percent(10),
        });
      }

      if (!this.chartSettings.tooltips.cafe.enabled.value) {
        cafeSeries.slices.template.set("tooltipText", "");
      } else {
        cafeSeries.slices.template.set(
          "tooltipText",
          this.chartSettings.tooltips.cafe.text.value
        );
      }

      // Slices settings.
      if (this.chartSettings.slices.cafe.enabled.value) {
        cafeSeries.slices.template.setAll({
          fillOpacity: this.chartSettings.slices.cafe.opacity.value,
          stroke: am5.color(
            `#${this.chartSettings.slices.cafe.borderColor.value}`
          ),
          strokeWidth: this.chartSettings.slices.cafe.borderWidth.value,
        });
      }

      // Slice click settings.
      if (!this.chartSettings.clickedSlices.cafe.enabled.value) {
        cafeSeries.slices.template.set("toggleKey", "none"); // Disable slice shift on click.
      } else {
        if (this.chartSettings.clickedSlices.cafe.customStyle.value) {
          cafeSeries.slices.template.states.create("active", {
            shiftRadius: this.chartSettings.clickedSlices.cafe.radius.value,
            stroke: am5.color(
              `#${this.chartSettings.clickedSlices.cafe.borderColor.value}`
            ),
            strokeWidth:
              this.chartSettings.clickedSlices.cafe.borderWidth.value,
          });
        }
      }

      // Custom colors.
      if (this.chartSettings.no_group.no_subGroup.customColors.value) {
        cafeSeries
          .get("colors")
          .set("colors", [
            am5.color(0x095256),
            am5.color(0x087f8c),
            am5.color(0x5aaa95),
          ]);
      }

      // Legend settings.
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(this.chartSettings.legend.cafe.centerX.value),
          x: am5.percent(this.chartSettings.legend.cafe.x.value),
          y: am5.percent(this.chartSettings.legend.cafe.y.value),
          layout: root.horizontalLayout,
        })
      );

      cafeSeries.data.setAll(diagramsMockData);
      legend.data.setAll(cafeSeries.dataItems);

      if (this.chartSettings.series.food.enabled.value) {
        foodSeries.data.setAll(diagramsMockData);
        legend.data.setAll(foodSeries.dataItems);
      }

      foodSeries = null;

      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped></style>
