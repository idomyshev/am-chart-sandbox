import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { barMockData } from "@/mockData/diagramsData";

export const initConfig = () => {
  return {
    columnTemplate: {
      _noSubGroup: {
        draggable: {
          value: true,
          type: "radio",
        },
        cursorOverStyle: {
          value: "pointer",
          type: "text-field.text",
        },
        tooltipText: {
          value: "drag to rearrange",
          type: "text-field.text",
        },
        cornerRadiusBR: {
          value: 10,
          type: "text-field.number",
        },
        cornerRadiusTR: {
          value: 10,
          type: "text-field.number",
        },
      },
    },
  };
};

const initChart = (root, chartSettings) => {
  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
    })
  );

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  let yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });

  let yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "country",
      renderer: yRenderer,
    })
  );

  let xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      renderer: am5xy.AxisRendererX.new(root, {}),
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "value",
      sequencedInterpolation: true,
      categoryYField: "country",
    })
  );

  let columnTemplate = series.columns.template;

  columnTemplate.setAll({
    draggable: chartSettings.columnTemplate._noSubGroup.draggable.value,
    cursorOverStyle:
      chartSettings.columnTemplate._noSubGroup.cursorOverStyle.value,
    tooltipText: chartSettings.columnTemplate._noSubGroup.tooltipText.value,
    cornerRadiusBR:
      chartSettings.columnTemplate._noSubGroup.cornerRadiusBR.value,
    cornerRadiusTR:
      chartSettings.columnTemplate._noSubGroup.cornerRadiusTR.value,
  });
  columnTemplate.adapters.add("fill", (fill, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  columnTemplate.adapters.add("stroke", (stroke, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  columnTemplate.events.on("dragstop", () => {
    sortCategoryAxis(chartSettings);
  });

  // Get series item by category
  function getSeriesItem(category) {
    for (var i = 0; i < series.dataItems.length; i++) {
      let dataItem = series.dataItems[i];
      if (dataItem.get("categoryY") == category) {
        return dataItem;
      }
    }
  }

  // Axis sorting
  function sortCategoryAxis(chartSettings) {
    // Sort by value
    series.dataItems.sort(function (x, y) {
      return y.get("graphics").y() - x.get("graphics").y();
    });

    let easing = am5.ease.out(am5.ease.cubic);

    // Go through each axis item
    am5.array.each(yAxis.dataItems, function (dataItem) {
      // get corresponding series item
      let seriesDataItem = getSeriesItem(dataItem.get("category"));

      if (seriesDataItem) {
        // get index of series data item
        let index = series.dataItems.indexOf(seriesDataItem);

        let column = seriesDataItem.get("graphics");

        // position after sorting
        let fy =
          yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
          column.height() / 2;

        // set index to be the same as series data item index
        if (index != dataItem.get("index")) {
          dataItem.set("index", index);

          // current position
          let x = column.x();
          let y = column.y();

          column.set("dy", -(fy - y));
          column.set("dx", x);

          column.animate({
            key: "dy",
            to: 0,
            duration:
              chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
            easing: easing,
          });
          column.animate({
            key: "dx",
            to: 0,
            duration:
              chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
            easing: easing,
          });
        } else {
          column.animate({
            key: "y",
            to: fy,
            duration:
              chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
            easing: easing,
          });
          column.animate({
            key: "x",
            to: 0,
            duration:
              chartSettings.animation._noSubGroup.animateSpeedOnDrop.value,
            easing: easing,
          });
        }
      }
    });

    // Sort axis items by index.
    // This changes the order instantly, but as dx and dy is set and animated,
    // they keep in the same places and then animate to true positions.
    yAxis.dataItems.sort(function (x, y) {
      return x.get("index") - y.get("index");
    });
  }

  yAxis.data.setAll(barMockData);
  series.data.setAll(barMockData);

  return [chart, series];
};

export default { initConfig, initChart };
