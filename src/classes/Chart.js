// import {
//   __animationSettings,
//   __bulletsSettings,
// } from "@/settings/charts/sharedSettings";
import * as am5 from "@amcharts/amcharts5";
import { settingsModels } from "@/settings/charts/settingsModels";
// import * as am5percent from "@amcharts/amcharts4/charts";
import * as am5percent from "@amcharts/amcharts5/percent";
import { diagramsMockData } from "@/mockData/diagramsData";
// import { settingsModels } from "@/settings/charts/settingsModels";

export const Chart = class Chart {
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

  addAnimation() {
    this.series.forEach((el) => {
      el.appear(this.settings.animation.seriesAppear);
    });
    this.chart.appear(
      this.settings.animation.chartOpacityAppear,
      this.settings.animation.chartAppear
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
  setRoot(root) {
    this.root = root;
    // root.container.children.push(
    //   am5percent.PieChart.new(root, {
    //     radius: am5.percent(90),
    //     innerRadius: am5.percent(75),
    //   })
    // );
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

export const PieChart = class PieChart extends Chart {
  testFunc() {
    console.log("test func");
  }
  initChart(root1, chartSettings, enabledFeatures) {
    console.log(enabledFeatures);
    // root = this.root;
    console.log("root", root1);

    const chart = root1.container.children.push(
      am5percent.PieChart.new(root1, {
        radius: am5.percent(90),
        innerRadius: am5.percent(75),
      })
    );

    const cafeSeries = chart.series.push(
      am5percent.PieSeries.new(root1, {
        name: "Series",
        valueField: "cafe",
        categoryField: "month",
        alignLabels: false,
      })
    );

    // Second series.
    let foodSeries = null;
    foodSeries = chart.series.push(
      am5percent.PieSeries.new(root1, {
        name: "Series",
        valueField: "food",
        categoryField: "month",
        alignLabels: false,
        startAngle: 0,
        endAngle: 50,
      })
    );

    cafeSeries.data.setAll(diagramsMockData);
    // legend.data.setAll(cafeSeries.dataItems);

    // if (chartSettings.series.food.enabled.value) {
    foodSeries.data.setAll(diagramsMockData);
    // legend.data.setAll(foodSeries.dataItems);
    // }

    return [chart, foodSeries];
    // foodSeries = null;
  }
};
