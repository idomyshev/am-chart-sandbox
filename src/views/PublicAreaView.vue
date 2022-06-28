<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <ColumnsCharts v-if="false" />
    <BarCharts />
  </div>
</template>
<script>
import ColumnsCharts from "@/components/ColumnsChart";
import BarCharts from "@/components/BarChart";
export default {
  name: "AmChartsSandbox",
  components: { BarCharts, ColumnsCharts },
  data() {
    return {};
  },
  mounted() {},

  beforeDestroy() {},
};
</script>
<style lang="scss" scoped></style>
