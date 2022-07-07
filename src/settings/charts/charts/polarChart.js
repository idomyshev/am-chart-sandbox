import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";

const initChart = (root) => {
  const chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
    })
  );

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
  const cursor = chart.set(
    "cursor",
    am5radar.RadarCursor.new(root, {
      behavior: "zoomX",
    })
  );

  cursor.lineY.set("visible", false);
  cursor.lineX.set("visible", true);

  // Create axes and their renderers
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
  const xRenderer = am5radar.AxisRendererCircular.new(root, {});
  xRenderer.labels.template.setAll({
    radius: 10,
  });

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "direction",
      renderer: xRenderer,
    })
  );

  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5radar.AxisRendererRadial.new(root, {}),
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series

  let series = chart.series.push(
    am5radar.RadarLineSeries.new(root, {
      stacked: true,
      name: "Series ",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "direction",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{categoryX}: {valueY}",
      }),
    })
  );

  let series2 = chart.series.push(
    am5radar.RadarLineSeries.new(root, {
      stacked: true,
      name: "Series ",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value2",
      categoryXField: "direction",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{categoryX}: {valueY}",
      }),
    })
  );

  // series.strokes.template.set("strokeWidth", 2);

  let data = [
    {
      direction: "N",
      value: 8,
      value2: 8,
    },
    {
      direction: "NE",
      value: 9,
      value2: 9,
    },
    {
      direction: "E",
      value: 4.5,
      value2: 4.5,
    },
    {
      direction: "SE",
      value: 3.5,
      value2: 3.5,
    },
    {
      direction: "S",
      value: 9.2,
      value2: 9.2,
    },
    {
      direction: "SW",
      value: 8.4,
      value2: 9,
    },
    {
      direction: "W",
      value: 11.1,
      value2: 12,
    },
    {
      direction: "NW",
      value: 10,
      value2: 14,
    },
  ];

  series.data.setAll(data);
  series2.data.setAll(data);
  xAxis.data.setAll(data);

  let range0 = xAxis.createAxisRange(
    xAxis.makeDataItem({ category: "NW", endCategory: "NW" })
  );
  range0.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0x0000ff),
    fillOpacity: 0.3,
  });

  let range1 = xAxis.createAxisRange(
    xAxis.makeDataItem({ category: "N", endCategory: "N" })
  );
  range1.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0x0000ff),
    fillOpacity: 0.3,
  });

  let range2 = xAxis.createAxisRange(
    xAxis.makeDataItem({ category: "SE", endCategory: "S" })
  );
  range2.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0xff0000),
    fillOpacity: 0.3,
  });

  chart.radarContainer.children.moveValue(chart.topGridContainer, 0);

  return [chart, series];
};

export default { initChart, initConfig: () => {} };
