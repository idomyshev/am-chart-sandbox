<template>
  <div class="container">
    <div class="top">
      <Waffle />
      <Progress />
    </div>
    <Donut />
    <LineChart />
  </div>
</template>

<script>
import Donut from "./styledCharts/Donut.vue";
import LineChart from "./styledCharts/LineChart.vue";
import Progress from "./styledCharts/Progress.vue";
import Waffle from "./styledCharts/Waffle.vue";

export default {
  name: "DemoCharts",
  components: { Donut, LineChart, Progress, Waffle },
};
</script>

<style scooped>
.top {
  display: flex;
}
</style>
