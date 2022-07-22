<template>
  <v-dialog v-model="show" max-width="400">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> Create chart </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Chart name"
            :rules="[validationRules.chartName]"
          />
          <v-select
            v-model="template"
            :items="chartTemplates"
            :rules="[validationRules.chartTemplate]"
            label="Chart template"
            item-value="name"
            item-text="label"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="close" depressed>Close</v-btn>
          <v-btn
            @click="createChart"
            color="light-green darken-1"
            depressed
            class="ml-6"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { chartTemplates } from "@/settings";
import { validationRules } from "@/helpers/validationRules";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/apiRoutes";

export default {
  name: "ChartCard",
  model: {
    prop: "id",
  },
  props: {
    id: [Number, Boolean],
  },
  data() {
    return {
      name: "",
      template: "",
      chartTemplates,
      show: false,
      validationRules,
      valid: false,
    };
  },
  computed: {},
  watch: {
    id(val) {
      this.show = val === false ? false : true;
    },
  },
  methods: {
    async createChart() {
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      const res = await apiRequest({
        path: API_ROUTES.CHART,
        method: "post",
        data: {
          name: this.name,
          template: this.template,
          config: {},
        },
      });
      if (res?.success) {
        await this.$store.dispatch("chart/fetchCharts");
        this.$emit("input", false);
        this.$refs.form.reset();
      } else {
        console.error(`Error when try to create chart with name ${this.name}`);
      }
    },
    close() {
      this.$emit("input", false);
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped></style>
