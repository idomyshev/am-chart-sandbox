<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="itemsWithIndex"
      :items-per-page="10"
      class="elevation-1"
      v-model="selected"
      show-select
      item-key="index"
    >
    </v-data-table>
  </div>
</template>

<script>
import { tableData } from "@/components/styledCharts/mockData";

export default {
  name: "DataTable",
  data() {
    return {
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "checkbox",
        },
        { text: "#", value: "index" },
        { text: "Name", value: "name" },
        { text: "Industry", value: "industry" },
        { text: "Channel", value: "channel" },
        { text: "KPI Metric", value: "kpi" },
        { text: "Spend", value: "spend" },
      ],
      tableData: tableData,
      singleSelect: false,
      selected: [],
    };
  },
  computed: {
    itemsWithIndex() {
      return this.tableData.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
