import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { radarMockData } from "@/mockData/diagramsData";

const initConfig = () => {
  return {
    labels: {
      _noSubGroup: {
        radius: {
          value: 10,
          type: "text-field.number",
        },
      },
    },
    strokes: {
      _noSubGroup: {
        strokeWidth: {
          value: 2,
          type: "text-field.number",
        },
      },
    },
    bullets: {
      _noSubGroup: {
        radius: {
          value: 5,
          type: "text-field.number",
        },
      },
    },
  };
};

const initChart = (root, chartSettings) => {
  // Create chart
  let chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
    })
  );

  // Add cursor
  let cursor = chart.set(
    "cursor",
    am5radar.RadarCursor.new(root, {
      behavior: "zoomX",
    })
  );

  cursor.lineY.set("visible", false);

  // Create axes and their renderers
  let xRenderer = am5radar.AxisRendererCircular.new(root, {});
  xRenderer.labels.template.setAll({
    fill: am5.color(`#999`),
    radius: chartSettings.labels._noSubGroup.radius.value,
    fontSize: `15px`,
  });

  let xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 200,
      categoryField: "country",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5radar.AxisRendererRadial.new(root, {}),
    })
  );

  // Create series
  let series = chart.series.push(
    am5radar.RadarLineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "litres",
      categoryXField: "country",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}",
      }),
    })
  );

  series.strokes.template.setAll({
    strokeWidth: chartSettings.strokes._noSubGroup.strokeWidth.value,
  });

  // series.bullets.push(() => {
  //   return am5.Bullet.new(root, {
  //     sprite: am5.Circle.new(root, {
  //       radius: chartSettings.bullets._noSubGroup.radius.value,
  //       fill: series.get("fill"),
  //     }),
  //   });
  // });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: "#fff",
        strokeWidth: 2,
        stroke: "#f00",
      }),
    });
  });

  let range2 = xAxis.createAxisRange(
    xAxis.makeDataItem({
      category: "UK",
    })
  );
  range2.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0x0000ff),
    fillOpacity: 0.1,
  });
  let range3 = xAxis.createAxisRange(
    xAxis.makeDataItem({
      category: "Belgium",
    })
  );
  range3.get("axisFill").setAll({
    visible: true,
    fill: am5.color(0x00ff00),
    fillOpacity: 0.1,
  });

  series.data.setAll(radarMockData);
  xAxis.data.setAll(radarMockData);

  return [chart, series];
};

export default { initConfig, initChart };
