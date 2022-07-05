<template>
  <div>
    <div class="chart-row">
      <Waffle />
      <Progress />
    </div>
    <div class="chart-row">
      <Donut />
    </div>
    <div class="chart-row">
      <LineChart />
    </div>
  </div>
</template>

<script>
import Donut from "@/components/styledCharts/Donut.vue";
import LineChart from "@/components/styledCharts/LineChart.vue";
import Progress from "@/components/styledCharts/Progress.vue";
import Waffle from "@/components/styledCharts/Waffle.vue";

export default {
  name: "DemoCharts",
  components: { Donut, LineChart, Progress, Waffle },
};
</script>

<style>
.chart-row {
  display: flex;
  margin-top: 20px;
}
.container {
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: 10px 5px;
}
.legend {
  height: 100px;
  align-items: center;
}
.title {
  display: flex;
  font-weight: 700;
  font-size: 30px;
  padding-left: 20px;
}
.title:before {
  display: inline-block;
  content: "";
  width: 8px;
  height: 30px;
  background-color: #000;
  margin-right: 10px;
  border-radius: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
}
</style>
