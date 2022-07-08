import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5 from "@amcharts/amcharts5";
import { diagramsMockData } from "@/mockData/diagramsData";
import { Chart } from "@/classes/Chart";

export const ChartA = class PieChart extends Chart {
  initChart() {
    const root = this.root;

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(70),
        innerRadius: am5.percent(50),
      })
    );

    const cafeSeries = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "cafe",
        categoryField: "month",
        alignLabels: false,
      })
    );

    // Second series.
    let foodSeries = null;
    foodSeries = chart.series.push(
      am5percent.PieSeries.new(root, {
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
