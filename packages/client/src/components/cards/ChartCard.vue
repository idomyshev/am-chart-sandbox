<template>
  <v-dialog v-model="show" max-width="700">
    <v-form ref="form" v-model="valid">
      <v-card class="pb-3 px-3">
        <v-card-title> Chart configuration </v-card-title>
        <v-card-text>
          <v-divider class="mb-4" />
          <v-row>
            <v-col>
              <img
                v-if="template === 'ChartF'"
                src="@/assets/images/waffle.png"
                width="200"
              />
              <img
                v-if="template === 'ChartD'"
                src="@/assets/images/progress.png"
                width="200"
              />
              <img
                v-if="template === 'ChartE'"
                src="@/assets/images/donut.png"
                width="200"
              />
              <img
                v-if="template === 'ChartC'"
                src="@/assets/images/line.png"
                width="200"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="template"
                :items="chartTemplates"
                :rules="[validationRules.chartTemplate]"
                label="Chart Type"
                item-value="name"
                item-text="label"
                filled
              />
              <div class="d-flex">
                <ColorPalette
                  v-for="item in [1, 2, 3, 4, 5, 6]"
                  :key="item"
                  v-model="chosenPaletteNumber"
                  :palette-number="item"
                />
              </div>
            </v-col>
          </v-row>
          <v-divider class="mt-4 mb-4" />
          <v-text-field
            v-model="name"
            label="Chart Title"
            :rules="[validationRules.chartName]"
            outlined
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="close" min-width="150" depressed>Close</v-btn>
          <v-btn
            @click="createChart"
            min-width="150"
            color="secondary"
            depressed
            class="ml-6"
            >Add Widget</v-btn
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
import ColorPalette from "@/components/ColorPalette";

export default {
  name: "ChartCard",
  components: { ColorPalette },
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
      chosenPaletteNumber: null,
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
