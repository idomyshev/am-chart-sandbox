<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5" :class="isNoSettings ? 'd-none' : ''">
      <SettingsArea v-model="chartSettings" />
    </v-col>
    <v-col :cols="isNoSettings ? 12 : 7">
      <div class="am-charts-container" ref="amChart"></div>
    </v-col>
  </v-row>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import SettingsArea from "@/components/SettingsArea";
import { emptyChartConfig } from "@/settings/charts/emptyChartConfig";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: "HierarchyChart",

  components: { SettingsArea },

  data() {
    return {
      chartSettings: emptyChartConfig(),
    };
  },

  computed: {
    isNoSettings() {
      return !Object.keys(this.chartSettings).length;
    },
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
        if (this.root) {
          this.root.dispose();
        }
        this.createDiagram();
      });
    },
    createDiagram() {
      const root = am5.Root.new(this.$refs.amChart, {
        useSafeResolution: false,
      });

      root.setThemes([am5themes_Animated.new(root)]);

      let data = {
        name: "Root",
        value: 0,
        children: [
          {
            name: "1",
            linkWith: ["2"],
            children: [
              {
                name: "A",
                children: [
                  { name: "A1", value: 1 },
                  { name: "A2", value: 1 },
                  { name: "A3", value: 1 },
                  { name: "A4", value: 1 },
                  { name: "A5", value: 1 },
                ],
              },
              {
                name: "B",
                children: [
                  { name: "B1", value: 1 },
                  { name: "B2", value: 1 },
                  { name: "B3", value: 1 },
                  { name: "B4", value: 1 },
                  { name: "B5", value: 1 },
                ],
              },
              {
                name: "C",
                children: [
                  { name: "C1", value: 1 },
                  { name: "C2", value: 1 },
                  { name: "C3", value: 1 },
                  { name: "C4", value: 1 },
                  { name: "C5", value: 1 },
                ],
              },
            ],
          },

          {
            name: "2",
            linkWith: ["3"],
            children: [
              {
                name: "D",
                value: 1,
              },
              {
                name: "E",
                value: 1,
              },
            ],
          },
          {
            name: "3",
            children: [
              {
                name: "F",
                children: [
                  { name: "F1", value: 1 },
                  { name: "F2", value: 1 },
                  { name: "F3", value: 1 },
                  { name: "F4", value: 1 },
                  { name: "F5", value: 1 },
                ],
              },
              {
                name: "H",
                children: [
                  { name: "H1", value: 1 },
                  { name: "H2", value: 1 },
                  { name: "H3", value: 1 },
                  { name: "H4", value: 1 },
                  { name: "H5", value: 1 },
                ],
              },
              {
                name: "G",
                children: [
                  { name: "G1", value: 1 },
                  { name: "G2", value: 1 },
                  { name: "G3", value: 1 },
                  { name: "G4", value: 1 },
                  { name: "G5", value: 1 },
                ],
              },
            ],
          },
        ],
      };

      // Create wrapper container
      let container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout,
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
      let series = container.children.push(
        am5hierarchy.ForceDirected.new(root, {
          singleBranchOnly: false,
          downDepth: 1,
          topDepth: 1,
          maxRadius: 25,
          minRadius: 12,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          idField: "name",
          linkWithStrength: 0.3,
          linkWithField: "linkWith",
          manyBodyStrength: -15,
          centerStrength: 0.5,
        })
      );

      series.get("colors").set("step", 2);

      series.data.setAll([data]);
      series.set("selectedDataItem", series.dataItems[0]);

      // Make stuff animate on load
      series.appear(1000, 100);

      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped></style>
