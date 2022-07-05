<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row>
    <v-col cols="5" :class="isNoSettings ? 'd-none' : ''">
      <SettingsArea v-model="chartSettings" />
    </v-col>
    <v-col :cols="isNoSettings ? 12 : 7">
      <div class="chart-wrapper">
        <div class="am-charts-container" ref="amChart"></div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import SettingsArea from "@/components/SettingsArea";
import { emptyChartConfig } from "@/settings/charts/configs/emptyChartConfig";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Chart } from "@/classes/Chart";
import { hierarchyMockData } from "@/mockData/hierarchyMockData";

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

  beforeMount() {
    this.chart = new Chart();
    this.chartSettings = this.chart.initSettings(this.chartSettings);
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

      let chart = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout,
        })
      );

      let series = chart.children.push(
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

      series.data.setAll([hierarchyMockData]);
      series.set("selectedDataItem", series.dataItems[0]);

      // Make stuff animate on load
      this.chart.init(chart, [series]);
      this.chart.initAnimation();

      this.root = root;
    },
  },
};
</script>
<style lang="scss" scoped></style>
