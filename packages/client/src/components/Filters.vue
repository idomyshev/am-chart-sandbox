<template>
  <div class="filter">
    <div class="filter__item" v-for="filter in filters" :key="filter.label">
      <v-select
        :label="filter.label"
        :items="filter.items"
        :value="filter.initValue"
        background-color="primary"
        filled
        height="48"
        hide-details
        dense
        class="filter-input"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Filters",

  data() {
    return {
      filters: [
        {
          label: "Industry",
          initValue: null,
          items: [
            {
              text: "All",
              value: null,
            },
          ],
        },
        {
          label: "Category",
          initValue: null,
          items: [
            {
              text: "All",
              value: null,
            },
          ],
        },
        {
          label: "Campaign KPI",
          initValue: null,
          items: [
            {
              text: "All",
              value: null,
            },
          ],
        },
        {
          label: "Channel",
          initValue: null,
          items: [
            {
              text: "All",
              value: null,
            },
          ],
        },
        {
          label: "Channel Objective",
          initValue: null,
          items: [
            {
              text: "All",
              value: null,
            },
          ],
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/scss/custom_variables.scss";

.filter {
  display: flex;
}

.filter__item {
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
}

.filter-input {
  font-size: 14px;
  border-radius: $border-radius-small;
}
</style>
