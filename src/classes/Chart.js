import {
  __animationSettings,
  __bulletsSettings,
  __featureSettings,
} from "@/settings/charts/sharedSettings";
import * as am5 from "@amcharts/amcharts5";
// import { settingsModels } from "@/settings/charts/settingsModels";

export const Chart = class Chart {
  init(root, chart, seriesArray) {
    this.root = root;
    this.chart = chart;
    this.series = seriesArray;
  }

  initSettings(settings) {
    this.settings = {
      features: __featureSettings(),
      animation: __animationSettings(),
      bullets: __bulletsSettings(),
      ...settings,
    };
    return this.settings;
  }

  addAnimation() {
    this.series.forEach((el) => {
      el.appear(this.settings.animation._noSubGroup.seriesAppear.value);
    });
    this.chart.appear(
      this.settings.animation._noSubGroup.chartOpacityAppear.value,
      this.settings.animation._noSubGroup.chartAppear.value
    );
  }

  settingValue(groupName, seriesName, settingName) {
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
    const settings = this.settings;

    if (!settings[groupName]) {
      console.error(`Settings group ${groupName} not exist.`);
      return null;
    } else if (seriesName) {
      if (!settings[groupName][seriesName]) {
        console.error(
          `Series ${seriesName} for settings group ${groupName} not exist.`
        );
        return null;
      } else if (settings[groupName][seriesName][settingName] === undefined) {
        console.error(
          `Setting ${settingName} for series ${seriesName} for settings group ${groupName} not exist.`
        );
        return null;
      }
    } else {
      if (!settings[groupName][settingName]) {
        console.error(
          `Setting ${settingName} for settings group ${groupName} not exist.`
        );
        return null;
      }
    }

    const setting = seriesName
      ? settings[groupName][seriesName][settingName]
      : settings[groupName][settingName];

    return setting.value;
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
