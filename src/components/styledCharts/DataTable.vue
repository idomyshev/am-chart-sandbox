<template>
  <div class="container data-table">
    <div class="header">
      <span class="title">Advertiser Chart</span>
      <div style="display: flex; align-items: center">
        <v-select
          v-model="rowsPerPage"
          class="select"
          :items="items"
          height="48"
          hide-details
          outlined
          background-color="#f8f8fa"
          item-text="title"
          item-value="value"
          @change="updateOptions"
        ></v-select>
        <v-icon>mdi-dots-horizontal</v-icon>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="itemsWithIndex"
      :items-per-page="rowsPerPage"
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
        { text: "#", value: "index", align: "start" },
        { text: "Name", value: "name" },
        { text: "Industry", value: "industry" },
        { text: "Channel", value: "channel" },
        { text: "KPI Metric", value: "kpi" },
        { text: "Spend", value: "spend" },
      ],
      tableData: tableData,
      singleSelect: false,
      selected: [],
      rowsPerPage: 10,
      items: [
        { title: "Rows Per Page: 10", value: 10 },
        { title: "Rows Per Page: 20", value: 20 },
      ],
      options: {},
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
  methods: {
    updateOptions() {
      console.log();
      this.options.itemsPerPage = this.rowsPerPage;
    },
  },
};
</script>

<style lang="scss">
.data-table {
  .container {
    height: 600px;
  }
  .select {
    width: 200px;
    margin-right: 10px !important;
    border-radius: 10px;
  }
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
    > .v-input__control
    > .v-input__slot
    fieldset {
    color: #fff;
  }
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state):not(.v-input--is-disabled)
    > .v-input__control
    > .v-input__slot:hover
    fieldset {
    color: unset;
  }
  .v-text-field--box .v-input__slot,
  .v-text-field--outline .v-input__slot {
    min-height: 56px;
    display: flex !important;
    align-items: center !important;
  }
  .v-text-field--filled > .v-input__control > .v-input__slot,
  .v-text-field--full-width > .v-input__control > .v-input__slot,
  .v-text-field--outlined > .v-input__control > .v-input__slot {
    align-items: stretch;
    min-height: 48px !important;
  }
  .v-text-field--full-width .v-input__prepend-outer,
  .v-text-field--full-width .v-input__prepend-inner,
  .v-text-field--full-width .v-input__append-inner,
  .v-text-field--full-width .v-input__append-outer,
  .v-text-field--enclosed .v-input__prepend-outer,
  .v-text-field--enclosed .v-input__prepend-inner,
  .v-text-field--enclosed .v-input__append-inner,
  .v-text-field--enclosed .v-input__append-outer {
    margin-top: 11px;
  }
}
</style>
