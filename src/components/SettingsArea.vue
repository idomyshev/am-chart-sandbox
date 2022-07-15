<template>
  <div class="diagram-settings">
    <v-card class="mb-2">
      <v-card-title>Settings customization</v-card-title>
      <v-card-text>
        <v-select
          v-model="enabledSettingsGroups"
          :items="settingsFeatures"
          label="Select settings groups for customization"
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
          label="Customize settings for selected series"
          multiple
          outlined
        />
      </v-card-text>
    </v-card>
    <v-expansion-panels v-model="panel" multiple>
      <template v-for="modelName in enabledSettingsGroups">
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
              <!--                v-model="config.settings[group[0]][subGroup[0]][item[0]].value"-->
              <!--                :label="item[0]"-->
              <!--                :disabled="item[1].disabled"-->
              <!--              />-->
              <!--              <v-checkbox-->
              <!--                v-if="-->
              <!--                  getSettingsModelProperty(group[0], item[0], 'type') ===-->
              <!--                  'checkbox'-->
              <!--                "-->
              <!--                v-model="config.settings[group[0]][subGroup[0]][item[0]].value"-->
              <!--                :label="item[0]"-->
              <!--                :disabled="item[1].disabled"-->
              <!--              />-->
              <!--              {{ config.settings }}-->
              <template
                v-if="['number', 'text-field.text'].includes(item[1].type)"
              >
                <v-text-field
                  v-if="!item[1].serial"
                  v-model="config.settings[modelName][item[0]]"
                  :label="item[0]"
                  :class="
                    item[1].type !== 'text-field.text' ? 'limited-width' : ''
                  "
                  :disabled="item[1].disabled"
                />
                <template v-else>
                  <v-text-field
                    v-for="(seriesSetting, key) in config.settings[modelName][
                      item[0]
                    ]"
                    :key="`${modelName}_${item[0]}_${key}`"
                    v-model="config.settings[modelName][item[0]][key]"
                    :label="`${item[0]} (Series: ${getSeries(key)})`"
                    :class="{
                      'limited-width': item[1].type === 'number',
                      'd-none': !seriesSelector.includes(key),
                    }"
                    :disabled="item[1].disabled"
                    >{{ seriesSetting }}</v-text-field
                  >
                </template>
              </template>
              <template v-if="item[1].type === 'color'">
                <template v-if="!item[1].serial">
                  <div class="diagram-settings__color-picker-title">
                    {{ item[0] }}
                  </div>
                  <div class="diagram-settings__color-picker-box">
                    <v-color-picker
                      v-model="config.settings[modelName][item[0]]"
                    />
                    <div>
                      {{ config.settings[modelName][item[0]] }}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    v-for="(seriesSetting, key) in config.settings[modelName][
                      item[0]
                    ]"
                    :key="`${modelName}_${item[0]}_${key}`"
                    :class="{ 'd-none': !seriesSelector.includes(key) }"
                  >
                    <div class="diagram-settings__color-picker-title">
                      {{ `${item[0]} (Series: ${getSeries(key)})` }}
                    </div>
                    <div class="diagram-settings__color-picker-box">
                      <v-color-picker
                        v-model="config.settings[modelName][item[0]][key]"
                      />
                      <div>
                        {{ config.settings[modelName][item[0]][key] }}
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
    </v-expansion-panels>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "@/helpers";
import {
  getSettingGroupMeta,
  getSettingsModel,
  getSettingsModelProperty,
  settingsFeatures,
  settingsModels,
} from "@/settings/charts/settingsModels";

export default {
  name: "SettingsArea",
  model: {
    prop: "parentConfig",
  },
  props: {
    parentConfig: Object,
  },
  beforeMount() {
    this.updateConfig();
  },
  data() {
    return {
      settingsModels,
      panel: [],
      config: {},
      capitalizeFirstLetter,
      getSettingsModelProperty,
      settingsFeatures,
      getSettingGroupMeta,
      getSettingsModel,
      seriesSelector: [0],
      enabledSettingsGroups: (() => {
        return this.parentConfig.meta.enabledSettingsGroups;
      })(),
    };
  },
  computed: {
    seriesItems() {
      const items = [];
      this.config.meta.series.forEach((name, index) =>
        items.push({ index, name })
      );
      return items;
    },
  },
  watch: {
    parentConfig: {
      handler() {
        this.updateConfig();
      },
      deep: true,
    },
    // "settings.meta": {
    //   handler() {
    //     this.enabledSettingsGroups = (() =>
    //       this.config.meta.enabledSettingsGroups)();
    //   },
    //   deep: true,
    // },
    enabledSettingsGroups(val) {
      this.config.meta.enabledSettingsGroups = val;
    },
  },
  methods: {
    getSeries(index) {
      return this.config.meta.series[index];
    },
    getItems(subgroup) {
      return Object.entries(subgroup).filter((el) => {
        return el[0].substring(0, 2) !== "__" && el[1].type;
      });
    },
    updateConfig() {
      this.config = this.parentConfig;
      this.enabledSettingsGroups = this.parentConfig.meta.enabledSettingsGroups;
    },
  },
};
</script>

<style scoped></style>
