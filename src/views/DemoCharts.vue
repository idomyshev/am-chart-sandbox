<template>
  <div>
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

<style>
.top {
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
  align-self: flex-start;
  font-weight: 700;
  font-size: 30px;
  padding-left: 20px;
}
</style>
