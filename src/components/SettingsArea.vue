<template>
  <div class="diagram-settings">
    <v-expansion-panels v-model="panel" multiple>
      <template v-for="group in getGroups()">
        <v-expansion-panel
          :key="group[0]"
          v-if="
            chartSettings.features._noSubGroup[group[0]] &&
            chartSettings.features._noSubGroup[group[0]].value
          "
        >
          <v-expansion-panel-header
            :class="group[1].__bold && 'font-weight-bold'"
          >
            <span v-if="group[1].__title">{{ group[1].__title }}</span>
            <span v-else>{{ capitalizeFirstLetter(group[0]) }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              v-for="subGroup in getSubGroups(group[1])"
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
        </v-expansion-panel>
      </template>
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
  methods: {
    getGroups() {
      return Object.entries(this.chartSettings);
    },
    getSubGroups(subGroups) {
      return Object.entries(subGroups).filter((el) => {
        return el[0].substring(0, 2) !== "__";
      });
    },
  },
  beforeMount() {
    this.chartSettings = this.parentChartSettings;
  },
};
</script>

<style scoped></style>
