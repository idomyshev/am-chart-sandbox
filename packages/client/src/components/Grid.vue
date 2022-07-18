<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[16, 16]"
    :use-css-transforms="true"
    class="grid__layout"
  >
    <grid-item
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      class="grid__item"
    >
      <h3 class="grid__title">{{ item.i }}</h3>
      <component v-bind:is="item.componentName"></component>
    </grid-item>
  </grid-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { GridLayout, GridItem } from "vue-grid-layout";
import Statistics from "@/components/Statistics.vue";

export default Vue.extend({
  name: "Grid",

  components: {
    Statistics,
    GridLayout,
    GridItem,
  },

  data() {
    return {
      test: "Statistics",
      layout: [
        {
          x: 0,
          y: 0,
          w: 12,
          h: 6,
          i: "Summary",
          moved: false,
          componentName: "Statistics",
        },
        { x: 0, y: 6, w: 8, h: 8, i: "Line Chart", moved: false },
        { x: 8, y: 6, w: 4, h: 8, i: "Progress Chart", moved: false },
        { x: 0, y: 14, w: 6, h: 8, i: "Doughnut Chart", moved: false },
        { x: 6, y: 14, w: 6, h: 8, i: "Waffle Chart", moved: false },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/theme.scss";
@import "@/scss/custom_variables.scss";

.grid__layout {
  margin: 0 -16px;
}

.grid__item {
  padding: 28px 32px;
  border-radius: $border-radius;
}

.grid__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;

  &::before {
    content: "";
    display: inline-block;
    height: 32px;
    width: 8px;
    margin-right: 16px;
    vertical-align: bottom;
    background-color: var(--v-secondary-base);
    border-radius: 4px;
  }
}
</style>

<style lang="scss">
@import "./src/scss/custom_variables.scss";

.grid__item.vue-grid-item > .vue-resizable-handle {
  width: 20px;
  height: 20px;
  bottom: 8px;
  right: 8px;
  padding: 0;
  background-image: url("~@/assets/icons/resizable-handle.svg");
  background-size: 20px;
}

.v-application.theme--light {
  .grid__item {
    background-color: #ffffff;
    box-shadow: $box-shadow-light;
  }
}

.v-application.theme--dark {
  .grid__item {
    background-color: rgba(53, 56, 94, 0.55);
  }
}
</style>
