import * as am5 from "@amcharts/amcharts5";
import { ChartConstructor } from "@/classes/ChartConstructor";
import * as am5xy from "@amcharts/amcharts5/xy";
import { lineData, lineData2 } from "@/components/styledCharts/mockData";

export const ChartC = class ChartC extends ChartConstructor {
  initChart() {
    const root = this.root;

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
      })
    );

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 10,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let yRenderer = yAxis.get("renderer");

    yRenderer.grid.template.setAll({
      strokeWidth: 1,
      strokeDasharray: [10, 5],
    });

    // Add series
    let series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        stroke: "#f560e6",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );

    let series2 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        stroke: "#9567d8",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 3,
    });

    series2.strokes.template.setAll({
      strokeWidth: 3,
    });

    series.data.setAll(lineData);
    series2.data.setAll(lineData2);

    // Add cursor
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    return { chart, series: [series, series2] };
  }
};
