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
      :i="item.name"
      :key="item.id"
      class="grid__item"
    >
      <h3 class="grid__title">{{ item.name }}</h3>
      <component v-bind:is="item.componentName"></component>
      <!--      <LineChart />-->
      <BasicChart
        v-if="!item.noConfig"
        :chart="charts.find((el) => el.id === item.id)"
      />
    </grid-item>
  </grid-layout>
</template>

<script>
import Vue from "vue";
import { GridLayout, GridItem } from "vue-grid-layout";
import Statistics from "@/components/Statistics.vue";
import { mapGetters } from "vuex";
import BasicChart from "../views/BasicChart.vue";
import WaffleChart from "./styledCharts/Waffle.vue";
import LineChart from "@/components/styledCharts/LineChart.vue";

export default Vue.extend({
  name: "Grid",

  components: {
    WaffleChart,
    BasicChart,
    Statistics,
    GridLayout,
    GridItem,
    LineChart,
  },

  async beforeCreate() {
    const layout = JSON.parse(localStorage.getItem("layout"));
    await this.$store.dispatch("chart/fetchCharts");
    if (layout) {
      this.layout = layout;
    } else {
      this.createLayout();
    }
  },

  data() {
    return {
      test: "Statistics",
      layout: [],
      layoutInit: [
        {
          x: 0,
          y: 0,
          w: 12,
          h: 6,
          i: "Summary",
          name: "Summary",
          id: -1,
          moved: false,
          componentName: "Statistics",
          noConfig: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("chart", ["charts"]),
  },

  watch: {
    charts() {
      this.createLayout();
    },
    layout: {
      handler(val) {
        localStorage.setItem("layout", JSON.stringify(val));
      },
      deep: true,
    },
  },

  methods: {
    createLayout() {
      this.layout = [...this.layoutInit];
      this.charts.forEach((el, index) => {
        this.layout.push({
          x: index % 2 ? 6 : 0,
          y: 0,
          w: 6,
          h: 10,
          i: el.name,
          id: el.id,
          name: el.name,
          moved: false,
          index,
        });
      });
    },
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
