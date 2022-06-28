<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="am-charts-container" ref="amChart"></div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
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
    };
  },
  mounted() {
    const root = am5.Root.new(this.$refs.amChart, { useSafeResolution: false });
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );
    console.log(root, "some", am5xy, "some2", am5themes_Animated);

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "cafe",
        categoryField: "month",
      })
    );
    series.data.setAll(diagramsMockData);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );
    legend.data.setAll(series.dataItems);

    // let series = chart.series.push(
    //   am5xy.ColumnSeries.new(root, {
    //     name: "Series",
    //     xAxis: xAxis,
    //     yAxis: yAxis,
    //     valueYField: "value",
    //     valueXField: "date",
    //   })
    // );
  },

  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.am-charts-container {
  max-width: 1000px;
  height: 650px;
  margin: 0 auto;
}
</style>
