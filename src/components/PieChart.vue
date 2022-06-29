<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5">
      <div class="diagram-settings">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Chart settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="diagram-settings__line">
                <v-text-field
                  v-model="settings.chart.radius"
                  label="Radius"
                  class="limited-width"
                />
                <v-text-field
                  v-model="settings.chart.innerRadius"
                  label="Inner radius"
                  class="limited-width"
                />
                <v-switch
                  v-model="settings.customColors"
                  label="Custom colors"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Slices settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="diagram-settings__line">
                <v-switch
                  v-model="settings.slices.enabled"
                  label="Series custom style"
                />
                <template v-if="settings.slices.enabled">
                  <v-text-field
                    v-model="settings.slices.opacity"
                    label="Slice opacity"
                    class="limited-width"
                  />
                  <v-text-field
                    v-model="settings.slices.borderColor"
                    label="Border color (#)"
                    class="limited-width"
                  />
                </template>
              </div>
              <div class="diagram-settings__line">
                <v-switch
                  v-model="settings.sliceClick.enabled"
                  label="Enable action on slice click"
                />
                <template v-if="settings.sliceClick.enabled">
                  <v-switch
                    v-model="settings.sliceClick.customStyle"
                    label="Custom style on slice click"
                  />
                  <template v-if="settings.sliceClick.customStyle">
                    <v-text-field
                      v-model="settings.sliceClick.shiftRadius"
                      label="Radius"
                      class="limited-width"
                    />
                    <v-text-field
                      v-model="settings.sliceClick.shiftBorderColor"
                      label="Border color"
                      class="limited-width"
                    />
                    <v-text-field
                      v-model="settings.sliceClick.shiftBorderWidth"
                      label="Border width"
                      class="limited-width"
                    />
                  </template>
                </template>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Labels settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="diagram-settings__line">
                <v-switch
                  v-model="settings.labels.enabled"
                  label="Enable labels"
                />
                <template v-if="settings.labels.enabled">
                  <template v-if="settings.labels.enabled">
                    <v-checkbox
                      v-model="settings.labels.inside"
                      label="Labels inside"
                      color="var(--v-checkbox1-base)"
                    />
                    <v-text-field
                      v-model="settings.labels.radius"
                      label="Label radius"
                      class="limited-width"
                    />
                  </template>
                </template>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Legend settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="diagram-settings__line">
                <v-text-field
                  v-model="settings.legend.centerX"
                  label="centerX"
                  class="limited-width"
                />
                <v-text-field
                  v-model="settings.legend.x"
                  label="X"
                  class="limited-width"
                />
                <v-text-field
                  v-model="settings.legend.y"
                  label="Y"
                  class="limited-width"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
    <v-col cols="7">
      <div class="am-charts-container" ref="amChart"></div>
    </v-col>
  </v-row>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { diagramsMockData } from "@/mockData/diagramsData";

export default {
  name: "PieChart",
  data() {
    return {
      panel: [0],
      showGrid: true,
      showGridAboveSeries: false,
      showTicks: true,
      showYLabels: true,
      showXLabels: true,
      settings: {
        customColors: true,
        slices: {
          enabled: true,
          opacity: 1,
          borderColor: "fff",
        },
        chart: {
          radius: 80,
          innerRadius: 55,
        },
        labels: {
          enabled: true,
          radius: 70,
          inside: true,
        },
        sliceClick: {
          enabled: true,
          customStyle: true,
          shiftRadius: 20,
          shiftBorderColor: "6666",
          shiftBorderWidth: 2,
        },
        legend: {
          centerX: 50,
          x: 50,
          y: 1,
        },
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
          radius: am5.percent(this.settings.chart.radius),
          innerRadius: am5.percent(this.settings.chart.innerRadius),
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

      // Labels.
      if (!this.settings.labels.enabled) {
        series.labels.template.set("forceHidden", true);
      } else {
        series.labels.template.setAll({
          text: "{category}",
          radius: this.settings.labels.radius,
          inside: this.settings.labels.inside,
          textType: "circular",
          // centerX: am5.percent(10),
        });
      }

      // Slices settings.
      if (this.settings.slices.enabled) {
        series.slices.template.setAll({
          fillOpacity: this.settings.slices.opacity,
          stroke: am5.color(`#${this.settings.slices.borderColor}`),
          strokeWidth: this.settings.slices.borderWidth,
        });
      }

      // Slice click settings.
      if (!this.settings.sliceClick.enabled) {
        series.slices.template.set("toggleKey", "none"); // Disable slice shift on click.
      } else {
        if (this.settings.sliceClick.customStyle) {
          series.slices.template.states.create("active", {
            shiftRadius: this.settings.sliceClick.shiftRadius,
            stroke: am5.color(`#${this.settings.sliceClick.shiftBorderColor}`),
            strokeWidth: this.settings.sliceClick.shiftBorderWidth,
          });
        }
      }

      // Custom colors.
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

      // Legend settings.
      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(this.settings.legend.centerX),
          x: am5.percent(this.settings.legend.x),
          y: am5.percent(this.settings.legend.y),
          layout: root.horizontalLayout,
        })
      );

      legend.data.setAll(series.dataItems);
      series.data.setAll(diagramsMockData);
      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped></style>
