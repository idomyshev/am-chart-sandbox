<template>
  <div class="diagram-settings">
    <v-card class="mb-2">
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <v-select
          v-model="enabledSettingsFeatures"
          :items="settingsFeatures"
          label="Enabled features"
          multiple
          chips
          outlined
        />
        <v-select
          v-if="seriesItems.length"
          :items="seriesItems"
          item-value="index"
          item-text="name"
          v-model="seriesSelector"
          label="Selected series"
          outlined
        />
      </v-card-text>
    </v-card>
    <v-expansion-panels v-model="panel" multiple>
      <template v-for="modelName in enabledSettingsFeatures">
        <v-expansion-panel :key="modelName">
          <v-expansion-panel-header>
            <span v-if="getSettingGroupMeta(modelName, 'title')">{{
              getSettingGroupMeta(modelName, "title")
            }}</span>
            <span v-else>{{ capitalizeFirstLetter(modelName) }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              v-for="item in getSettingsModel(modelName)"
              :key="`${modelName}_${item[0]}`"
            >
              <!--              <v-switch-->
              <!--                v-if="item[1].type === 'radio'"-->
              <!--                v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"-->
              <!--                :label="item[0]"-->
              <!--                :disabled="item[1].disabled"-->
              <!--              />-->
              <!--              <v-checkbox-->
              <!--                v-if="-->
              <!--                  getSettingsModelProperty(group[0], item[0], 'type') ===-->
              <!--                  'checkbox'-->
              <!--                "-->
              <!--                v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"-->
              <!--                :label="item[0]"-->
              <!--                :disabled="item[1].disabled"-->
              <!--              />-->
              <!--              {{ chartSettings }}-->
              <template
                v-if="
                  ['text-field.number', 'text-field.text'].includes(
                    item[1].type
                  )
                "
              >
                <v-text-field
                  v-if="!chartSettings[modelName][item[0]].length"
                  v-model="chartSettings[modelName][item[0]]"
                  :label="item[0]"
                  :class="
                    item[1].type !== 'text-field.text' ? 'limited-width' : ''
                  "
                  :disabled="item[1].disabled"
                />
                <template v-else>
                  <v-text-field
                    v-for="(seriesSetting, key) in chartSettings[modelName][
                      item[0]
                    ]"
                    :key="`${modelName}_${item[0]}_${key}`"
                    v-model="chartSettings[modelName][item[0]][key]"
                    :label="item[0] + key"
                    :class="{
                      'limited-width': item[1].type === 'text-field.number',
                      'd-none': seriesSelector !== key,
                    }"
                    :disabled="item[1].disabled"
                    >{{ seriesSetting }}</v-text-field
                  >
                </template>
              </template>
              <!--              <div v-if="item[1].type === 'color'">-->
              <!--                <div class="diagram-settings__color-picker-title">-->
              <!--                  {{ item[0] }}-->
              <!--                </div>-->
              <!--                <div class="diagram-settings__color-picker-box">-->
              <!--                  <v-color-picker-->
              <!--                    v-model="-->
              <!--                      chartSettings[group[0]][subGroup[0]][item[0]].value-->
              <!--                    "-->
              <!--                  />-->
              <!--                  <div>-->
              <!--                    {{ chartSettings[group[0]][subGroup[0]][item[0]].value }}-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
    </v-expansion-panels>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "@/helpers";
import { COLORS } from "@/settings/colors";
import {
  enabledSettingsFeatures,
  getSettingGroupMeta,
  getSettingsModel,
  getSettingsModelProperty,
  settingsFeatures,
  settingsModels,
} from "@/settings/charts/settingsModels";

export default {
  name: "SettingsArea",
  model: {
    prop: "parentChartSettings",
  },
  props: {
    parentChartSettings: Object,
    configMeta: Object,
  },
  beforeMount() {
    // const seriesSelector = {};
    // this.enabledSettingsFeatures.forEach((modelName) => {
    //   seriesSelector[modelName] = {};
    //   getSettingsModel(modelName).forEach((el) => {
    //     if (el[1].serial) {
    //       seriesSelector[modelName][el[0]] = 1;
    //     }
    //   });
    // });
    // this.seriesSelector = seriesSelector;
    this.updateSettings();
  },
  mounted() {
    this.$emit("enabledFeaturesUpdated", this.enabledSettingsFeatures);
  },
  data() {
    return {
      enabledSettingsFeatures,
      settingsModels,
      panel: [],
      chartSettings: {},
      capitalizeFirstLetter,
      COLORS,
      getSettingsModelProperty,
      settingsFeatures,
      getSettingGroupMeta,
      getSettingsModel,
      seriesSelector: 0,
      tst: { group: { value: 1 } },
    };
  },
  computed: {
    seriesItems() {
      const items = [];
      this.configMeta.series.forEach((name, index) =>
        items.push({ index, name })
      );
      return items;
    },
  },
  watch: {
    parentChartSettings: {
      handler() {
        this.updateSettings();
      },
      deep: true,
    },
    enabledSettingsFeatures: {
      handler() {
        this.$emit("enabledFeaturesUpdated", this.enabledSettingsFeatures);
      },
    },
  },
  methods: {
    getGroups() {
      return Object.entries(this.chartSettings);
    },
    getItems(subgroup) {
      return Object.entries(subgroup).filter((el) => {
        return el[0].substring(0, 2) !== "__" && el[1].type;
      });
    },
    updateSettings() {
      this.chartSettings = this.parentChartSettings;
    },
  },
};
</script>

<style scoped></style>
