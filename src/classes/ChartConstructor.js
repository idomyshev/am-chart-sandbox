// import {
//   __animationSettings,
//   __bulletsSettings,
// } from "@/settings/charts/sharedSettings";
import * as am5 from "@amcharts/amcharts5";
import { settingsModels } from "@/settings/charts/settingsModels";
// import * as am5percent from "@amcharts/amcharts4/charts";
// import { settingsModels } from "@/settings/charts/settingsModels";

export const ChartConstructor = class ChartConstructor {
  init(root, chart, seriesArray) {
    this.root = root;
    this.chart = chart;
    this.series = seriesArray;
  }

  setChartConfig(config) {
    this.config = config.settings;
    this.configMeta = config.meta;
  }

  loadSettings() {
    const config = this.config;
    const settings = {};
    Object.entries(settingsModels).forEach((modelArray) => {
      const [modelName, model] = modelArray;
      Object.entries(model).forEach((settingArray) => {
        const [settingName, setting] = settingArray;
        settings[modelName] = settings[modelName] ? settings[modelName] : {};
        if (config[modelName] && config[modelName][settingName]) {
          settings[modelName][settingName] = config[modelName][settingName];
        } else {
          if (!setting.serial) {
            settings[modelName][settingName] = setting.defaultValue;
          } else {
            settings[modelName][settingName] = [];
            this.configMeta.series.forEach(() => {
              settings[modelName][settingName].push(setting.defaultValue);
            });
          }
        }
      });
    });
    this.settings = settings;
    return settings;
  }

  settingValue(groupName, settingName, seriesIndex) {
    const settings = this.settings;

    if (!settings[groupName]) {
      console.error(`settingValue(): Settings group '${groupName}' not exist.`);
      return null;
    }

    if (settings[groupName][settingName] === undefined) {
      console.error(
        `settingValue(): Setting '${settingName}' for settings group '${groupName}' not exist.`
      );
      return null;
    }

    let returnVal = null;
    if (seriesIndex !== undefined) {
      if (
        !settings[groupName][settingName].length ||
        settings[groupName][settingName][seriesIndex] === undefined
      ) {
        console.error(
          `settingValue(): Setting '${settingName}' for settings group '${groupName}' with series index '${seriesIndex}' not exist.`
        );
        return null;
      }

      returnVal = settings[groupName][settingName][seriesIndex];
    } else {
      returnVal = settings[groupName][settingName];
    }
    return returnVal;
  }
  setRoot(root) {
    this.root = root;
  }

  setEnabledFeatures(val) {
    this.enabledFeatures = val;
  }

  isFeatureEnabled(featureName) {
    return !!this.enabledFeatures.find((el) => el === featureName);
  }

  addAnimation() {
    this.series.forEach((el, index) => {
      el.appear(this.settingValue("animation", "seriesAppearTime", index));
    });
    this.chart.appear(
      this.settingValue("animation", "chartOpacityAppear"),
      this.settingValue("animation", "chartAppear")
    );
  }

  addBullets() {
    this.series.forEach((el, i) => {
      el.bullets.push(() => {
        return am5.Bullet.new(this.root, {
          sprite: am5.Circle.new(this.root, {
            radius: this.settingValue("bullets", "radius", i),
            fill: this.settingValue("bullets", "fill", i),
            strokeWidth: this.settingValue("bullets", "strokeWidth", i),
            stroke: this.settingValue("bullets", "stroke", i),
          }),
        });
      });
    });
  }
};
