<template>
  <div class="app-wrapper">
    <Menu></Menu>
    <div class="app-content">
      <div class="global-overview">
        <Header />
        <Filters />
        <Grid />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Filters from "@/components/Filters.vue";
import Grid from "@/components/Grid.vue";
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu";

export default Vue.extend({
  name: "GlobalOverview",
  components: {
    Filters,
    Grid,
    Header,
    Menu,
  },
});
</script>
<style lang="scss">
.app-wrapper {
  display: flex;
}

.app-content {
  width: 100%;
  padding: 0 48px;
}
</style>
