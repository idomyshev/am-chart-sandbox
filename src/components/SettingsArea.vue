<template>
  <div class="diagram-settings">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel
        v-for="group in Object.entries(chartSettings)"
        :key="group[0]"
      >
        <template
          v-if="
            chartSettings.general.features[group[0]] &&
            chartSettings.general.features[group[0]].value
          "
        >
          <v-expansion-panel-header>
            {{ capitalizeFirstLetter(group[0]) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              v-for="subGroup in Object.entries(group[1])"
              :key="`${group[0]}_${subGroup[0]}`"
              class="diagram-settings__line-block"
            >
              <div
                v-if="subGroup[0] !== '_noSubGroup'"
                class="diagram-settings__subgroup-title"
              >
                <span v-if="subGroup[1].__type">
                  {{ subGroup[1].__type }}:
                </span>
                {{ subGroup[0] }}
              </div>
              <div
                v-for="item in Object.entries(subGroup[1])"
                :key="`${group[0]}_${subGroup[0]}_${item[0]}`"
              >
                <v-switch
                  v-if="item[1].type === 'radio'"
                  v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"
                  :label="item[0]"
                  :disabled="item[1].disabled"
                />
                <v-checkbox
                  v-if="item[1].type === 'checkbox'"
                  v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"
                  :label="item[0]"
                  :disabled="item[1].disabled"
                />
                <v-text-field
                  v-if="
                    [
                      'text-field.number',
                      'text-field.color',
                      'text-field.text',
                    ].includes(item[1].type)
                  "
                  v-model="chartSettings[group[0]][subGroup[0]][item[0]].value"
                  :label="item[0]"
                  :class="
                    item[1].type !== 'text-field.text' ? 'limited-width' : ''
                  "
                  :disabled="item[1].disabled"
                />
              </div>
            </div>
          </v-expansion-panel-content>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "@/helpers";

export default {
  name: "SettingsArea",
  model: {
    prop: "parentChartSettings",
  },
  props: {
    parentChartSettings: Object,
  },
  data() {
    return {
      panel: [],
      chartSettings: {},
      capitalizeFirstLetter,
    };
  },
  beforeMount() {
    this.chartSettings = this.parentChartSettings;
  },
};
</script>

<style scoped></style>
