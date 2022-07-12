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
    <div class="chart-row">
      <DataTable />
    </div>
  </div>
</template>

<script>
import Donut from "@/components/styledCharts/Donut.vue";
import LineChart from "@/components/styledCharts/LineChart.vue";
import Progress from "@/components/styledCharts/Progress.vue";
import Waffle from "@/components/styledCharts/Waffle.vue";
import DataTable from "@/components/styledCharts/DataTable.vue";

export default {
  name: "DemoCharts",
  components: { Donut, LineChart, Progress, Waffle, DataTable },
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
  padding: 0;
  padding-bottom: 20px;
}
.legend {
  height: 100px;
  align-items: center;
}
.title {
  display: flex;
  font-weight: 700;
  font-size: 30px;
}
.title:before {
  display: inline-block;
  content: "";
  width: 8px;
  height: 30px;
  background-color: #000;
  margin-right: 10px;
  border-radius: 14px;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
  padding-top: 32px;
  padding-bottom: 52px;
}
.v-application--is-ltr .v-data-footer__select {
  display: none;
}
th span {
  font-weight: 600;
  color: #222542;
}
.v-application .elevation-1 {
  box-shadow: unset !important;
}
.v-data-footer {
  padding-top: 16px;
  position: relative;
}
.v-data-footer__icons-before {
  position: absolute;
  right: 3%;
}
.v-data-footer__icons-after {
  position: absolute;
  right: 1%;
}
.v-application--is-ltr .v-data-footer__pagination {
  margin: 0 33px 0 34px;
}
tr th:first-child {
  padding-left: 40px !important;
}
tr td:first-child {
  padding-left: 40px !important;
}
</style>
