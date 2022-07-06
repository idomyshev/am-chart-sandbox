import {
  __animationSettings,
  __featureSettings,
} from "@/settings/charts/sharedSettings";
import * as am5 from "@amcharts/amcharts5";

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

  addBullets() {
    this.series.forEach((el) => {
      el.bullets.push(() => {
        return am5.Bullet.new(this.root, {
          sprite: am5.Circle.new(this.root, {
            radius: 35,
            fill: "#fff",
            strokeWidth: 2,
            stroke: "#00f",
          }),
        });
      });
    });
  }
};
