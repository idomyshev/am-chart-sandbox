import * as am5 from "@amcharts/amcharts5";
import { diagramsMockData } from "@/mockData/diagramsData";
import { ChartConstructor } from "@/classes/ChartConstructor";
import * as am5xy from "@amcharts/amcharts5/xy";

export const ChartB = class ChartB extends ChartConstructor {
  initChart() {
    const root = this.root;

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: true,
        layout: root.verticalLayout,
      })
    );

    // yAxis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: this.settingValue("axes", "yStrokeOpacity"),
          strokeWidth: this.settingValue("axes", "yStrokeWidth"),
          stroke: this.settingValue("axes", "yStroke"),
        }),
      })
    );

    // xAxis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: this.settingValue("axes", "xStrokeOpacity"),
          strokeWidth: this.settingValue("axes", "xStrokeWidth"),
          stroke: this.settingValue("axes", "xStroke"),
        }),
        categoryField: "month",
        startLocation: 0,
        endLocation: 1,
      })
    );

    xAxis.data.setAll(diagramsMockData);

    // Renderers.
    const yRenderer = yAxis.get("renderer");
    const xRenderer = xAxis.get("renderer");
    yRenderer.grid.template.setAll({
      stroke: this.settingValue("grid", "yStroke"),
      strokeWidth: this.settingValue("grid", "yStrokeWidth"),
    });

    xRenderer.grid.template.setAll({
      stroke: this.settingValue("grid", "xStroke"),
      strokeWidth: this.settingValue("grid", "xStrokeWidth"),
    });

    // if (chartSettings.grid._noSubGroup.gridContainerToFront.value) {
    //   chart.gridContainer.toFront();
    // }

    // Ticks Y.
    yRenderer.ticks.template.setAll({
      stroke: this.settingValue("ticks", "yStroke"),
      strokeWidth: this.settingValue("ticks", "yStrokeWidth"),
      visible: this.isSettingsGroupEnabled("ticks"),
    });

    // Ticks X.
    xRenderer.ticks.template.setAll({
      stroke: this.settingValue("ticks", "xStroke"),
      strokeWidth: this.settingValue("ticks", "xStrokeWidth"),
      visible: this.isSettingsGroupEnabled("ticks"),
    });

    // Labels Y.
    yRenderer.labels.template.setAll({
      fill: this.settingValue("labels", "yFill"),
      fontSize: `${this.settingValue("labels", "yFontSize")}em`,
    });

    // Labels X.
    xRenderer.labels.template.setAll({
      fill: this.settingValue("labels", "xFill"),
      fontSize: `${this.settingValue("labels", "xFontSize")}em`,
      radius: 30,
    });

    // Food series.
    let food = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Food",
        xAxis,
        yAxis,
        valueYField: "food",
        categoryXField: "month",
      })
    );

    // Legend.
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(this.settingValue("legend", "centerX")),
        x: am5.percent(this.settingValue("legend", "x")),
        y: am5.percent(this.settingValue("legend", "y")),
        layout: root.horizontalLayout,
      })
    );
    legend.data.setAll(chart.series.values);

    // Cursor
    if (this.isSettingsGroupEnabled("cursor")) {
      chart.set("cursor", am5xy.XYCursor.new(root, {}));
    }

    // Cafe series.
    const cafe = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Cafe",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "cafe",
        categoryXField: "month",
      })
    );

    food.data.setAll(diagramsMockData);
    cafe.data.setAll(diagramsMockData);

    return { chart, series: [food, cafe] };
  }
};
