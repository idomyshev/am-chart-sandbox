import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5 from "@amcharts/amcharts5";
import { diagramsMockData } from "@/mockData/diagramsData";
import { pieChartConfig } from "@/settings/charts/configs/pieChartConfig";

const initChart = (root, chartSettings) => {
  const chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      radius: am5.percent(chartSettings.chart._noSubGroup.radius.value),
      innerRadius: am5.percent(
        chartSettings.chart._noSubGroup.innerRadius.value
      ),
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
  if (chartSettings.series.food.enabled.value) {
    foodSeries = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "food",
        categoryField: "month",
        alignLabels: false,
        startAngle: chartSettings.series.food.startAngle.value,
        endAngle: chartSettings.series.food.endAngle.value,
      })
    );
  }

  // Ticks.
  if (!chartSettings.ticks.cafe.enabled.value) {
    cafeSeries.ticks.template.set("visible", false);
  } else {
    cafeSeries.ticks.template.setAll({
      stroke: am5.color(`#${chartSettings.ticks.cafe.color.value}`),
      strokeWidth: chartSettings.ticks.cafe.width.value,
    });
  }

  // Labels.
  if (!chartSettings.labels.cafe.enabled.value) {
    cafeSeries.labels.template.set("forceHidden", true);
  } else {
    cafeSeries.labels.template.setAll({
      text: "{category}",
      radius: chartSettings.labels.cafe.radius.value,
      inside: chartSettings.labels.cafe.inside.value,
      textType: chartSettings.labels.cafe.circular.value
        ? "circular"
        : undefined,
      // centerX: am5.percent(10),
    });
  }

  if (!chartSettings.tooltips.cafe.enabled.value) {
    cafeSeries.slices.template.set("tooltipText", "");
  } else {
    cafeSeries.slices.template.set(
      "tooltipText",
      chartSettings.tooltips.cafe.text.value
    );
  }

  // Slices settings.
  if (chartSettings.slices.cafe.enabled.value) {
    cafeSeries.slices.template.setAll({
      fillOpacity: chartSettings.slices.cafe.opacity.value,
      stroke: am5.color(`#${chartSettings.slices.cafe.borderColor.value}`),
      strokeWidth: chartSettings.slices.cafe.borderWidth.value,
    });
  }

  // Slice click settings.
  if (!chartSettings.clickedSlices.cafe.enabled.value) {
    cafeSeries.slices.template.set("toggleKey", "none"); // Disable slice shift on click.
  } else {
    if (chartSettings.clickedSlices.cafe.customStyle.value) {
      cafeSeries.slices.template.states.create("active", {
        shiftRadius: chartSettings.clickedSlices.cafe.radius.value,
        stroke: am5.color(
          `#${chartSettings.clickedSlices.cafe.borderColor.value}`
        ),
        strokeWidth: chartSettings.clickedSlices.cafe.borderWidth.value,
      });
    }
  }

  // Custom colors.
  if (chartSettings.general._noSubGroup.customColors.value) {
    cafeSeries
      .get("colors")
      .set("colors", [
        am5.color(0x095256),
        am5.color(0x087f8c),
        am5.color(0x5aaa95),
      ]);
  }

  // Legend settings.
  const legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.percent(chartSettings.legend.cafe.centerX.value),
      x: am5.percent(chartSettings.legend.cafe.x.value),
      y: am5.percent(chartSettings.legend.cafe.y.value),
      layout: root.horizontalLayout,
    })
  );

  cafeSeries.data.setAll(diagramsMockData);
  legend.data.setAll(cafeSeries.dataItems);

  if (chartSettings.series.food.enabled.value) {
    foodSeries.data.setAll(diagramsMockData);
    legend.data.setAll(foodSeries.dataItems);
  }

  return [chart, foodSeries];
  // foodSeries = null;
};

export default { initChart, initConfig: pieChartConfig };
