<template>
  <div class="header">
    <h1>Global Overview</h1>
    <v-btn class="header__btn" depressed color="secondary">Edit Layout</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Header",

  components: {},

  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/theme.scss";
@import "@/scss/custom_variables.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
}

.header__btn {
  border-radius: $border-radius-small;
  color: var(--v-primary-base) !important;
}
</style>
