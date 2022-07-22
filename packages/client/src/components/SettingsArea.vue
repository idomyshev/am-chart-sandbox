<template>
  <div class="chart-settings">
    <div>
      <v-select
        v-model="enabledSettingsGroups"
        :items="settingsFeatures"
        label="Which settings groups you want to customize?"
        multiple
        chips
        outlined
      />
      <v-radio-group
        v-model="seriesSelector"
        label="Which series you want to customize?"
      >
        <v-radio
          v-for="item in seriesItems"
          :label="item.name"
          :value="item.index"
          :key="item.index + item.name"
          >{{ item }}</v-radio
        >
      </v-radio-group>
      <!--      <v-select-->
      <!--        v-if="seriesItems.length"-->
      <!--        :items="seriesItems"-->
      <!--        item-value="index"-->
      <!--        item-text="name"-->
      <!--        v-model="seriesSelector"-->
      <!--        label="Choose series which you want to customize"-->
      <!--        class="chart-settings__series-selector"-->
      <!--        outlined-->
      <!--      />-->
    </div>
    <div>
      <v-tabs v-model="tab" class="mb-5">
        <v-tab v-for="modelName in enabledSettingsGroups" :key="modelName">
          <span v-if="getSettingGroupMeta(modelName, 'title')">{{
            getSettingGroupMeta(modelName, "title")
          }}</span>
          <span v-else>{{ capitalizeFirstLetter(modelName) }}</span>
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="modelName in enabledSettingsGroups" :key="modelName">
        <!--        <v-expansion-panel>-->
        <!--          <v-expansion-panel-header>-->
        <!--            <span v-if="getSettingGroupMeta(modelName, 'title')">{{-->
        <!--              getSettingGroupMeta(modelName, "title")-->
        <!--            }}</span>-->
        <!--            <span v-else>{{ capitalizeFirstLetter(modelName) }}</span>-->
        <!--          </v-expansion-panel-header>-->
        <!--          <v-expansion-panel-content>-->
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
          <template v-if="['number', 'text-field.text'].includes(item[1].type)">
            <v-text-field
              v-if="!item[1].serial"
              v-model="config.settings[modelName][item[0]]"
              :label="item[0]"
              :class="item[1].type !== 'text-field.text' ? 'limited-width' : ''"
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
                  'd-none': seriesSelector !== key,
                }"
                :disabled="item[1].disabled"
                >{{ seriesSetting }}</v-text-field
              >
            </template>
          </template>
          <template v-if="item[1].type === 'color'">
            <template v-if="!item[1].serial">
              <div class="chart-settings__color-picker-title">
                {{ item[0] }}
              </div>
              <div class="chart-settings__color-picker-box">
                <v-color-picker v-model="config.settings[modelName][item[0]]" />
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
                :class="{ 'd-none': seriesSelector !== key }"
              >
                <div class="chart-settings__color-picker-title">
                  {{ `${item[0]} (Series: ${getSeries(key)})` }}
                </div>
                <div class="chart-settings__color-picker-box">
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
        <!--          </v-expansion-panel-content>-->
        <!--        </v-expansion-panel>-->
      </v-tab-item>
    </v-tabs-items>
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
      radioGroup: null,
      tab: null,
      settingsModels,
      panel: [],
      config: {},
      capitalizeFirstLetter,
      getSettingsModelProperty,
      settingsFeatures,
      getSettingGroupMeta,
      getSettingsModel,
      seriesSelector: 0,
      enabledSettingsGroups: (() => {
        return this.parentConfig.enabledSettingsGroups;
      })(),
    };
  },
  computed: {
    seriesItems() {
      const items = [];
      this.config.series.forEach((name, index) => items.push({ index, name }));
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
    enabledSettingsGroups(val) {
      this.config.enabledSettingsGroups = val;
    },
  },
  methods: {
    getSeries(index) {
      return this.config.series[index];
    },
    getItems(subgroup) {
      return Object.entries(subgroup).filter((el) => {
        return el[0].substring(0, 2) !== "__" && el[1].type;
      });
    },
    updateConfig() {
      this.config = this.parentConfig;
      this.enabledSettingsGroups = this.parentConfig.enabledSettingsGroups;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-settings {
  margin-top: 20px;
  margin-bottom: 10px;
  &__series-selector {
    max-width: 370px;
  }
  &__line {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    > div {
      padding-right: 10px;
    }
  }
  &__line,
  &__line-block {
  }
  &__title {
    align-items: center;
    display: flex;
    max-width: 80px;
    padding-right: 120px;
    text-align: center;
  }
  &__subgroup-title {
    padding-bottom: 3px;
    border-bottom: 1px dashed #aaa;
    margin-bottom: 8px;
    font-style: italic;
    max-width: 80%;
  }
  &__color-picker-title {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }
  &__color-picker-box {
    border: 1px dashed #ccc;
    border-radius: 5px;
    padding: 10px 20px;
    margin-bottom: 15px;
    display: inline-block;
  }
}
</style>
