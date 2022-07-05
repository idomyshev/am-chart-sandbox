export const Chart = class Chart {
  constructor(settings, chart, seriesArray) {
    this.settings = settings;
    this.chart = chart;
    this.series = seriesArray;
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
