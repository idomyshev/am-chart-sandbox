<template>
  <div class="diagram-settings">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel
        v-for="group in Object.entries(chartSettings)"
        :key="group[0]"
      >
        <v-expansion-panel-header>
          {{ group[0].toUpperCase() }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div
            v-for="subGroup in Object.entries(group[1])"
            :key="`${group[0]}_${subGroup[0]}`"
            class="diagram-settings__line-block"
          >
            <div class="diagram-settings__subgroup-title">
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
    </v-expansion-panels>
  </div>
</template>

<script>
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
      panel: [0],
      chartSettings: {},
    };
  },
  beforeMount() {
    this.chartSettings = this.parentChartSettings;
  },
};
</script>

<style scoped></style>
