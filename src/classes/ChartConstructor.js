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

  initSettings() {
    // this.enabledFeatures = enabledFeatures;
    const settings = {};
    Object.entries(settingsModels).forEach((modelArray) => {
      const [modelName, model] = modelArray;
      Object.entries(model).forEach((settingArray) => {
        const [settingName, setting] = settingArray;
        settings[modelName] = settings[modelName] ? settings[modelName] : {};
        settings[modelName][settingName] = setting.defaultValue;
      });
    });
    this.settings = settings;
    // console.log(3, settings);
    // this.settings = {
    //   animation: __animationSettings(),
    //   bullets: __bulletsSettings(),
    //   ...oldSettings,
    // };
    return this.settings;
  }

  settingValue(groupName, param1, param2) {
    // if (!settingsModels[groupName]) {
    //   console.error(`Settings model for group ${groupName} not exist.`);
    //   return null;
    // } else if (settingsModels[groupName][settingName]) {
    //   console.error(
    //     `Settings model for setting ${settingName} of group ${groupName} not exist.`
    //   );
    //   return null;
    // }

    // const settingsModel = settingsModels[groupName][settingName];
    let seriesName = param2 ? param1 : null;
    const settingName = param2 ? param2 : param1;

    const settings = this.settings;

    if (!settings[groupName]) {
      console.error(`settingValue(): Settings group '${groupName}' not exist.`);
      return null;
    }

    if (seriesName) {
      if (!settings[groupName][seriesName]) {
        console.error(
          `settingValue(): Series '${seriesName}' for settings group '${groupName}' not exist.`
        );
        return null;
      }

      if (settings[groupName][seriesName][settingName] === undefined) {
        console.error(
          `settingValue(): Setting '${settingName}' for series '${seriesName}' for settings group '${groupName}' not exist.`
        );
        return null;
      }
    }

    if (settings[groupName][settingName] === undefined) {
      console.error(
        `settingValue(): Setting '${settingName}' for settings group '${groupName}' not exist.`
      );
      return null;
    }

    return seriesName
      ? settings[groupName][seriesName][settingName]
      : settings[groupName][settingName];
  }
  setRoot(root) {
    this.root = root;
    // root.container.children.push(
    //   am5percent.PieChart.new(root, {
    //     radius: am5.percent(90),
    //     innerRadius: am5.percent(75),
    //   })
    // );
  }

  setEnabledFeatures(val) {
    this.enabledFeatures = val;
  }

  addAnimation() {
    this.series.forEach((el) => {
      el.appear(this.settings.animation.seriesAppear);
    });
    this.chart.appear(
      this.settingValue("animation", "chartOpacityAppear"),
      this.settingValue("animation", "chartAppear")
    );
  }

  addBullets() {
    this.series.forEach((el) => {
      const seriesName = "_noSubGroup";
      el.bullets.push(() => {
        return am5.Bullet.new(this.root, {
          sprite: am5.Circle.new(this.root, {
            radius: this.settingValue("bullets", seriesName, "radius"),
            fill: this.settingValue("bullets", seriesName, "fill"),
            strokeWidth: this.settingValue(
              "bullets",
              seriesName,
              "strokeWidth"
            ),
            stroke: this.settingValue("bullets", seriesName, "stroke"),
          }),
        });
      });
    });
  }
};
