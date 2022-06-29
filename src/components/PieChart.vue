<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5">
      <div class="diagram-settings">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="group in settingsList" :key="group[0]">
            <v-expansion-panel-header>{{
              group[1].title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                :class="
                  group[1].itemsPosition !== 'line'
                    ? 'diagram-settings__line-block'
                    : 'diagram-settings__line'
                "
              >
                <div
                  v-for="item in Object.entries(group[1].items)"
                  :key="group[0] + '_' + item[0]"
                >
                  <v-switch
                    v-if="item[1].type === 'radio'"
                    v-model="testSettings[group[0]].items[item[0]].value"
                    :label="`${group[0]}.${item[0]}`"
                    :disabled="item[1].disabled"
                  />
                  <v-checkbox
                    v-if="item[1].type === 'checkbox'"
                    v-model="testSettings[group[0]].items[item[0]].value"
                    :label="`${group[0]}.${item[0]}`"
                    :disabled="item[1].disabled"
                  />
                  <v-text-field
                    v-if="
                      ['text-field.number', 'text-field.color'].includes(
                        item[1].type
                      )
                    "
                    v-model="testSettings[group[0]].items[item[0]].value"
                    :label="`${group[0]}.${item[0]}`"
                    class="limited-width"
                    :disabled="item[1].disabled"
                  />
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Legend settings (only for inner circle)
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
          <v-expansion-panel>
            <v-expansion-panel-header>
              Ticks settings (only for inner circle)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="diagram-settings__line">
                <v-switch
                  v-model="settings.ticks.enabled"
                  label="Enable ticks"
                />
                <v-text-field
                  v-model="settings.ticks.color"
                  label="Color"
                  class="limited-width"
                />
                <v-text-field
                  v-model="settings.ticks.width"
                  label="Width"
                  class="limited-width"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              Tooltips settings (only for inner circle)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="diagram-settings__line-block">
                <v-switch
                  v-model="settings.tooltips.enabled"
                  label="Enable tooltips"
                />
                <template v-if="settings.tooltips.enabled">
                  <v-text-field
                    v-model="settings.tooltips.text"
                    label="Tooltips text"
                /></template>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Series settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="diagram-settings__line">
                <v-switch
                  v-model="settings.series.second.enable"
                  label="Enable second series"
                />
                <template v-if="settings.series.second.enable">
                  <v-text-field
                    v-model="settings.series.second.fromAngle"
                    label="Angle from"
                    class="limited-width"
                    disabled
                  />
                  <v-text-field
                    v-model="settings.series.second.toAngle"
                    label="Angle to"
                    class="limited-width"
                    disabled
                  />
                </template>
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
import { getChartSettings } from "@/settings/charts/pieChart";
require("../settings/charts/pieChart.js");

export default {
  name: "PieChart",
  computed: {
    settingsList() {
      return Object.entries(this.testSettings);
    },
  },
  data() {
    return {
      testSettings: getChartSettings(),
      panel: [0],
      showGrid: true,
      showGridAboveSeries: false,
      showTicks: true,
      showYLabels: true,
      showXLabels: true,
      settings: {
        customColors: true,
        chart: {
          radius: 80,
          innerRadius: 55,
        },
        slices: {
          enabled: true,
          opacity: 1,
          borderColor: "fff",
        },
        sliceClick: {
          enabled: true,
          customStyle: true,
          shiftRadius: 20,
          shiftBorderColor: "6666",
          shiftBorderWidth: 2,
        },
        labels: {
          enabled: true,
          radius: 70,
          inside: true,
          circular: true,
        },
        legend: {
          centerX: 50,
          x: 50,
          y: 1,
        },
        ticks: {
          enabled: true,
          color: "000",
          width: 2,
        },
        tooltips: {
          enabled: true,
          text: "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})",
        },
        series: {
          second: {
            enable: true,
            fromAngle: 0,
            toAngle: 180,
          },
        },
      },
    };
  },
  created() {},
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
    testSettings: {
      handler() {
        this.initDiagram();
        console.log("testSettings updated");
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
          radius: am5.percent(this.testSettings.chart.items.radius.value),
          innerRadius: am5.percent(
            this.testSettings.chart.items.innerRadius.value
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
      if (this.settings.series.second.enable) {
        foodSeries = chart.series.push(
          am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "food",
            categoryField: "month",
            alignLabels: false,
            startAngle: this.settings.series.second.fromAngle,
            endAngle: this.settings.series.second.toAngle,
          })
        );
      }

      // Ticks.
      if (!this.settings.ticks.enabled) {
        cafeSeries.ticks.template.set("visible", false);
      } else {
        cafeSeries.ticks.template.setAll({
          stroke: am5.color(`#${this.settings.ticks.color}`),
          strokeWidth: this.settings.ticks.width,
        });
      }

      // Labels.
      if (!this.testSettings.labels.items.enabled.value) {
        cafeSeries.labels.template.set("forceHidden", true);
      } else {
        cafeSeries.labels.template.setAll({
          text: "{category}",
          radius: this.testSettings.labels.items.radius.value,
          inside: this.testSettings.labels.items.inside.value,
          textType: this.testSettings.labels.items.circular.value
            ? "circular"
            : undefined,
          // centerX: am5.percent(10),
        });
      }

      if (!this.settings.tooltips.enabled) {
        cafeSeries.slices.template.set("tooltipText", "");
      }
      {
        cafeSeries.slices.template.set(
          "tooltipText",
          this.settings.tooltips.text
        );
      }

      // Slices settings.
      if (this.testSettings.slices.items.enabled.value) {
        cafeSeries.slices.template.setAll({
          fillOpacity: this.testSettings.slices.items.opacity.value,
          stroke: am5.color(
            `#${this.testSettings.slices.items.borderColor.value}`
          ),
          strokeWidth: this.testSettings.slices.items.borderWidth.value,
        });
      }

      // Slice click settings.
      if (!this.testSettings.clickedSlices.items.enabled.value) {
        cafeSeries.slices.template.set("toggleKey", "none"); // Disable slice shift on click.
      } else {
        if (this.testSettings.clickedSlices.items.customStyle.value) {
          cafeSeries.slices.template.states.create("active", {
            shiftRadius: this.testSettings.clickedSlices.items.radius.value,
            stroke: am5.color(
              `#${this.testSettings.clickedSlices.items.borderColor.value}`
            ),
            strokeWidth:
              this.testSettings.clickedSlices.items.borderWidth.value,
          });
        }
      }

      // Custom colors.
      if (this.testSettings.general.items.customColors.value) {
        cafeSeries
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
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.percent(this.settings.legend.centerX),
          x: am5.percent(this.settings.legend.x),
          y: am5.percent(this.settings.legend.y),
          layout: root.horizontalLayout,
        })
      );

      cafeSeries.data.setAll(diagramsMockData);
      legend.data.setAll(cafeSeries.dataItems);

      if (this.settings.series.second.enable) {
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
