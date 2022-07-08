// import * as am5percent from "@amcharts/amcharts5/percent";
// import * as am5 from "@amcharts/amcharts5";
// import { diagramsMockData } from "@/mockData/diagramsData";
import { pieChartConfig } from "@/settings/charts/configs/pieChartConfig";
// // import { isFeatureEnabled } from "@/helpers/settings";
//
// const initChart = (root, chartSettings, enabledFeatures) => {
//   console.log(enabledFeatures);
//   const chart = root.container.children.push(
//     am5percent.PieChart.new(root, {
//       radius: am5.percent(90),
//       innerRadius: am5.percent(75),
//     })
//   );
//
//   const cafeSeries = chart.series.push(
//     am5percent.PieSeries.new(root, {
//       name: "Series",
//       valueField: "cafe",
//       categoryField: "month",
//       alignLabels: false,
//     })
//   );
//
//   // Second series.
//   let foodSeries = null;
//   foodSeries = chart.series.push(
//     am5percent.PieSeries.new(root, {
//       name: "Series",
//       valueField: "food",
//       categoryField: "month",
//       alignLabels: false,
//       startAngle: 0,
//       endAngle: 50,
//     })
//   );
//
//   // Ticks.
//   // if (!isFeatureEnabled(enabledFeatures, "ticks")) {
//   //   cafeSeries.ticks.template.set("visible", false);
//   // } else {
//   //   cafeSeries.ticks.template.setAll({
//   //     stroke: am5.color(`#${chartSettings.ticks.cafe.color.value}`),
//   //     strokeWidth: chartSettings.ticks.cafe.width.value,
//   //   });
//   // }
//
//   // Labels.
//   // if (!isFeatureEnabled(enabledFeatures, "labels")) {
//   //   cafeSeries.labels.template.set("forceHidden", true);
//   // } else {
//   //   cafeSeries.labels.template.setAll({
//   //     text: "{category}",
//   //     radius: chartSettings.labels.radius,
//   //     inside: chartSettings.labels.inside,
//   //     textType: chartSettings.labels.circular ? "circular" : undefined,
//   //     // centerX: am5.percent(10),
//   //   });
//   // }
//
//   // if (!isFeatureEnabled(enabledFeatures, "tooltips")) {
//   //   cafeSeries.slices.template.set("tooltipText", "");
//   // } else {
//   //   cafeSeries.slices.template.set("tooltipText", chartSettings.tooltips.text);
//   // }
//
//   // Slices settings.
//   // if (!isFeatureEnabled(enabledFeatures, "slices")) {
//   //   cafeSeries.slices.template.setAll({
//   //     fillOpacity: chartSettings.slices.opacity,
//   //     stroke: am5.color(`#${chartSettings.slices.borderColor}`),
//   //     strokeWidth: chartSettings.slices.borderWidth,
//   //   });
//   // }
//
//   // Slice click settings.
//   // if (!isFeatureEnabled(enabledFeatures, "clickedSlices")) {
//   //   cafeSeries.slices.template.set("toggleKey", "none"); // Disable slice shift on click.
//   // } else {
//   //   cafeSeries.slices.template.states.create("active", {
//   //     shiftRadius: chartSettings.clickedSlices.radius,
//   //     stroke: am5.color(`#${chartSettings.clickedSlices.borderColor}`),
//   //     strokeWidth: chartSettings.clickedSlices.borderWidth,
//   //   });
//   // }
//
//   // Custom colors.
//   // if (chartSettings.general._noSubGroup.customColors.value) {
//   //   cafeSeries
//   //     .get("colors")
//   //     .set("colors", [
//   //       am5.color(0x095256),
//   //       am5.color(0x087f8c),
//   //       am5.color(0x5aaa95),
//   //     ]);
//   // }
//
//   // Legend settings.
//   // const legend = chart.children.push(
//   //   am5.Legend.new(root, {
//   //     centerX: am5.percent(chartSettings.legend.cafe.centerX.value),
//   //     x: am5.percent(chartSettings.legend.cafe.x.value),
//   //     y: am5.percent(chartSettings.legend.cafe.y.value),
//   //     layout: root.horizontalLayout,
//   //   })
//   // );
//
//   cafeSeries.data.setAll(diagramsMockData);
//   // legend.data.setAll(cafeSeries.dataItems);
//
//   // if (chartSettings.series.food.enabled.value) {
//   foodSeries.data.setAll(diagramsMockData);
//   // legend.data.setAll(foodSeries.dataItems);
//   // }
//
//   return [chart, foodSeries];
//   // foodSeries = null;
// };

export default { initConfig: pieChartConfig };
