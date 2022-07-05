import {
  __animationSettings,
  __featureSettings,
} from "@/settings/charts/__reusedSettings";

export const Chart = class Chart {
  init(chart, seriesArray) {
    this.chart = chart;
    this.series = seriesArray;
  }

  initSettings(settings) {
    this.settings = {
      features: __featureSettings(),
      animation: __animationSettings(),
      ...settings,
    };
    return this.settings;
  }

  initAnimation() {
    this.series.forEach((el) => {
      el.appear(this.settings.animation._noSubGroup.seriesAppear.value);
    });
    this.chart.appear(
      this.settings.animation._noSubGroup.chartOpacityAppear.value,
      this.settings.animation._noSubGroup.chartAppear.value
    );
  }
};
