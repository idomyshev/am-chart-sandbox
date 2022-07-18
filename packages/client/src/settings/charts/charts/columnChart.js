import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { diagramsMockData } from "@/mockData/diagramsData";
import { columnChartConfig } from "@/settings/charts/configs/columnChartConfig";

const initChart = (root, chartSettings) => {
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
        strokeOpacity: chartSettings.axes.y.strokeOpacity.value,
        strokeWidth: chartSettings.axes.y.strokeWidth.value,
        stroke: am5.color(`#${chartSettings.axes.y.stroke.value}`),
      }),
    })
  );

  // xAxis
  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {
        strokeOpacity: chartSettings.axes.x.strokeOpacity.value,
        strokeWidth: chartSettings.axes.x.strokeWidth.value,
        stroke: am5.color(`#${chartSettings.axes.x.stroke.value}`),
      }),
      categoryField: "month",
      startLocation: chartSettings.axes.x.startLocation.value,
      endLocation: chartSettings.axes.x.endLocation.value,
    })
  );

  xAxis.data.setAll(diagramsMockData);

  // Renderers.
  const yRenderer = yAxis.get("renderer");
  const xRenderer = xAxis.get("renderer");

  // Grid Y.
  yRenderer.grid.template.setAll({
    stroke: am5.color(`#${chartSettings.grid.y.stroke.value}`),
    strokeWidth: chartSettings.grid.y.strokeWidth.value,
  });

  // Grid X.
  xRenderer.grid.template.setAll({
    stroke: am5.color(`#${chartSettings.grid.x.stroke.value}`),
    strokeWidth: chartSettings.grid.x.strokeWidth.value,
  });

  if (chartSettings.grid._noSubGroup.gridContainerToFront.value) {
    chart.gridContainer.toFront();
  }

  // Ticks Y.
  yRenderer.ticks.template.setAll({
    stroke: am5.color(`#${chartSettings.ticks.y.stroke.value}`),
    strokeWidth: chartSettings.ticks.y.strokeWidth.value,
    visible: chartSettings.ticks.y.enabled.value,
  });

  // Ticks X.
  xRenderer.ticks.template.setAll({
    stroke: am5.color(`#${chartSettings.ticks.x.stroke.value}`),
    strokeWidth: chartSettings.ticks.x.strokeWidth.value,
    visible: chartSettings.ticks.x.enabled.value,
  });

  // Labels Y.
  yRenderer.labels.template.setAll({
    fill: am5.color(`#${chartSettings.labels.y.fill.value}`),
    fontSize: `${chartSettings.labels.y.fontSize.value}em`,
  });

  // Labels X.
  xRenderer.labels.template.setAll({
    fill: am5.color(`#${chartSettings.labels.x.fill.value}`),
    fontSize: `${chartSettings.labels.x.fontSize.value}em`,
    radius: 30,
  });

  // Food series.
  let food = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Food",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "food",
      categoryXField: "month",
    })
  );

  // Legend.
  const legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.percent(chartSettings.legend.food.centerX.value),
      x: am5.percent(chartSettings.legend.food.x.value),
      y: am5.percent(chartSettings.legend.food.y.value),
      layout: root.horizontalLayout,
    })
  );
  legend.data.setAll(chart.series.values);

  // Cursor
  if (chartSettings.cursor._noSubGroup.enabled.value) {
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
  }

  // Cafe series.
  let cafe = chart.series.push(
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

  return [chart, food];
};

export default { initChart, initConfig: columnChartConfig };
