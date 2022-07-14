import * as am5 from "@amcharts/amcharts5";
import { settingsModels } from "@/settings/charts/settingsModels";
import { chartConfigs } from "@/settings/charts";

export const ChartConstructor = class ChartConstructor {
  create(root) {
    this.root = root;
    const { chart, series } = this.initChart();
    this.chart = chart;
    this.series = series;

    if (this.isFeatureEnabled("animation")) {
      this.addAnimation();
    }

    if (this.isFeatureEnabled("bullets")) {
      this.addBullets();
    }
  }

  createConfig(prototypeName) {
    const config = {};

    if (!chartConfigs[prototypeName]) {
      console.error(
        `Config file for chart's prototype ${prototypeName} is not defined!`
      );
    }

    const configFromFile = chartConfigs[prototypeName]();
    config.settings = this.createSettings(configFromFile);
    config.meta = configFromFile.meta;
    this.config = config;
    return config;
  }

  // Create settings for the chart using the chart's model and the chart's config file.
  createSettings(config) {
    const settings = {};
    Object.entries(settingsModels).forEach((modelArray) => {
      const [modelName, model] = modelArray;
      Object.entries(model).forEach((settingArray) => {
        const [settingName, setting] = settingArray;
        settings[modelName] = settings[modelName] ? settings[modelName] : {};
        if (
          config.settings[modelName] &&
          config.settings[modelName][settingName]
        ) {
          settings[modelName][settingName] =
            config.settings[modelName][settingName];
        } else {
          if (!setting.serial) {
            settings[modelName][settingName] = setting.defaultValue;
          } else {
            settings[modelName][settingName] = [];
            config.meta.series.forEach(() => {
              settings[modelName][settingName].push(setting.defaultValue);
            });
          }
        }
      });
    });
    return settings;
  }

  settingValue(groupName, settingName, seriesIndex) {
    const settings = this.config.settings;

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

  isFeatureEnabled(featureName) {
    return !!this.config.meta.enabledSettingsGroups.find(
      (el) => el === featureName
    );
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
