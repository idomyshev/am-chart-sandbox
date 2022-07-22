import * as am5 from "@amcharts/amcharts5";
import { ChartConstructor } from "@/classes/ChartConstructor";
import {
  waffleSeries1,
  waffleSeries2,
  waffleSeries3,
} from "@/components/styledCharts/mockData";
import * as am5xy from "@amcharts/amcharts5/xy";

export const ChartF = class ChartF extends ChartConstructor {
  initChart() {
    const root = this.root;

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
      })
    );

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        width: 500,
      })
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "x",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 10,
        }),
      })
    );

    xAxis.get("renderer").labels.template.set("forceHidden", true);

    xAxis.data.setAll([
      { x: "1" },
      { x: "2" },
      { x: "3" },
      { x: "4" },
      { x: "5" },
      { x: "6" },
      { x: "7" },
      { x: "8" },
      { x: "9" },
      { x: "10" },
    ]);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "y",
        renderer: am5xy.AxisRendererY.new(root, {}),
        height: am5.percent(100),
      })
    );

    yAxis.get("renderer").labels.template.set("forceHidden", true);
    root.interfaceColors.set("grid", "#fff");

    yAxis.data.setAll([
      { y: "1" },
      { y: "2" },
      { y: "3" },
      { y: "4" },
      { y: "5" },
      { y: "6" },
      { y: "7" },
      { y: "8" },
      { y: "9" },
      { y: "10" },
    ]);

    // Add series
    function makeSeries(name, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          categoryYField: "y",
          openCategoryYField: "y",
          categoryXField: "x",
          openCategoryXField: "x",
          clustered: false,
          fill: color,
          stroke: am5.color(0xffffff),
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        height: am5.percent(100),
        stroke: am5.color(0xffffff),
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
        cornerRadiusBL: 4,
        cornerRadiusBR: 4,
      });

      series.appear();

      legend.labels.template.setAll({
        text: "category",
        fontSize: 15,
        fontWeight: "500",
      });

      legend.valueLabels.template.setAll({
        text: "{category}",
        fontSize: 15,
        fontWeight: "500",
      });
      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10,
      });
      legend.data.push(series);

      return series;
    }

    const colorSet = ["#9567d8", "#f560e6", "#ffb27d"];

    const series1 = makeSeries("Democratic", colorSet[0]);
    series1.data.setAll(waffleSeries1);

    const series2 = makeSeries("Republican", colorSet[1]);
    series2.data.setAll(waffleSeries2);

    const series3 = makeSeries("Libertarian", colorSet[2]);
    series3.data.setAll(waffleSeries3);

    return { chart, series: [series1, series2, series3] };
  }
};
