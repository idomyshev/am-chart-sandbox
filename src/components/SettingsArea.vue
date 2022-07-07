<template>
  <div class="diagram-settings">
    <v-card class="mb-5">
      <v-card-title>Enabled settings features</v-card-title>
      <v-card-text>
        <v-select
          v-model="enabledSettingsFeatures"
          :items="settingsFeatures"
          label="Select features to enable"
          multiple
          chips
          solo
        />
      </v-card-text>
    </v-card>
    <v-expansion-panels v-model="panel" multiple>
      <template v-for="settingsGroupName in enabledSettingsFeatures">
        <v-expansion-panel :key="settingsGroupName">
          <v-expansion-panel-header>
            <span v-if="settingsModels[settingsGroupName].__title">{{
              settingsModels[settingsGroupName].__title
            }}</span>
            <span v-else>{{ capitalizeFirstLetter(settingsGroupName) }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <!--            <div-->
            <!--              v-for="item in getItems(subGroup[1])"-->
            <!--              :key="`${group[0]}_${subGroup[0]}_${item[0]}`"-->
            <!--            >-->
            <!--              <v-switch-->
            <!--                v-if="item[1].type === 'radio'"-->
            <!--                v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"-->
            <!--                :label="item[0]"-->
            <!--                :disabled="item[1].disabled"-->
            <!--              />-->
            <!--              <v-checkbox-->
            <!--                v-if="-->
            <!--                  getSettingModelProperty(group[0], item[0], 'type') ===-->
            <!--                  'checkbox'-->
            <!--                "-->
            <!--                v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"-->
            <!--                :label="item[0]"-->
            <!--                :disabled="item[1].disabled"-->
            <!--              />-->
            <!--              <v-text-field-->
            <!--                v-if="-->
            <!--                  ['text-field.number', 'text-field.text'].includes(-->
            <!--                    item[1].type-->
            <!--                  )-->
            <!--                "-->
            <!--                v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"-->
            <!--                :label="item[0]"-->
            <!--                :class="-->
            <!--                  item[1].type !== 'text-field.text' ? 'limited-width' : ''-->
            <!--                "-->
            <!--                :disabled="item[1].disabled"-->
            <!--              />-->
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
            <!--            </div>-->
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
  getSettingModelProperty,
  settingsModels,
} from "@/settings/charts/settingsModels";

export default {
  name: "SettingsArea",
  model: {
    prop: "parentChartSettings",
  },
  props: {
    parentChartSettings: Object,
  },
  mounted() {
    this.enabledSettingsFeatures = this.settingsFeatures;
  },
  data() {
    return {
      enabledSettingsFeatures: [],
      settingsModels,
      panel: [],
      chartSettings: {},
      capitalizeFirstLetter,
      COLORS,
      getSettingModelProperty,
    };
  },
  computed: {
    settingsFeatures() {
      return Object.keys(settingsModels);
    },
  },
  watch: {
    parentChartSettings: {
      handler() {
        this.chartSettings = this.parentChartSettings;
      },
      deep: true,
    },
  },
  methods: {
    getGroups() {
      return Object.entries(this.chartSettings);
    },
    getSubGroups(subGroups) {
      return Object.entries(subGroups).filter((el) => {
        return el[0].substring(0, 2) !== "__";
      });
    },
    getItems(subgroup) {
      return Object.entries(subgroup).filter((el) => {
        return el[0].substring(0, 2) !== "__" && el[1].type;
      });
    },
  },
  beforeMount() {
    this.chartSettings = this.parentChartSettings;
  },
};
</script>

<style scoped></style>
