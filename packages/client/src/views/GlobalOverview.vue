<template>
  <div class="global-overview">
    <Header />
    <Filters />
    <Grid />
  </div>
</template>

<script>
import Vue from "vue";
import Filters from "@/components/Filters.vue";
import Grid from "@/components/Grid.vue";
import Header from "@/components/Header.vue";

export default Vue.extend({
  name: "GlobalOverview",
  components: {
    Filters,
    Grid,
    Header,
  },
});
</script>
