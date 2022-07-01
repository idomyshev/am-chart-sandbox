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
import Donut from "@/components/styledCharts/Donut.vue";
import LineChart from "@/components/styledCharts/LineChart.vue";
import Progress from "@/components/styledCharts/Progress.vue";
import Waffle from "@/components/styledCharts/Waffle.vue";

export default {
  name: "DemoCharts",
  components: { Donut, LineChart, Progress, Waffle },
};
</script>

<style scooped>
.top {
  display: flex;
  margin-top: 20px;
}
</style>
