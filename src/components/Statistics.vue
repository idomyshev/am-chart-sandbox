<template>
  <div class="statistics">
    <div class="statistics__item" v-for="item in items" :key="item.title">
      <span class="statistics__item-title">{{ item.title }}</span>
      <span class="statistics__item-value">{{ item.value }}</span>
      <span
        v-if="item.label"
        :class="['statistics__item-label', item.label === 'up' ? 'up' : 'down']"
      >
        <v-icon v-if="item.label === 'up'" size="14"
          >mdi-arrow-top-right</v-icon
        >
        <v-icon v-else size="14">mdi-arrow-bottom-right</v-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Statistics",

  components: {},

  data() {
    return {
      items: [
        { title: "# Of Advertisers", value: "37" },
        { title: "Cost", value: "$45.0M" },
        { title: "Impressions", value: "3.4B" },
        { title: "Clicks", value: "65.4M" },
        { title: "Conversions", value: "100K", label: "up" },
        { title: "ROAS", value: "1.43" },
        { title: "CTR", value: "1.93%", label: "up" },
        { title: "CPM", value: "-$7.35", label: "down" },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./src/scss/theme.scss";
@import "./src/scss/custom_variables.scss";

.statistics {
  display: flex;
  flex-wrap: wrap;
  padding-top: 24px;
  margin-right: -8px;
  margin-bottom: -8px;

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 162px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 14px 24px;
    background-color: var(--v-medium-base);
    border-radius: $border-radius;
    overflow: hidden;
  }

  &__item-title {
    font-size: 14px;
  }

  &__item-value {
    font-size: 20px;
    font-weight: 600;
  }

  &__item-label {
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: $border-radius;

    & .v-icon {
      color: $content-white !important;
    }

    &.up {
      background-color: var(--v-success-base);
    }

    &.down {
      background-color: var(--v-error-base);
    }
  }
}
</style>
