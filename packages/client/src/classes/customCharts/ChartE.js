import * as am5 from "@amcharts/amcharts5";
import { ChartConstructor } from "@/classes/ChartConstructor";
import * as am5percent from "@amcharts/amcharts5/percent";
import { donutData } from "@/components/styledCharts/mockData";

export const ChartE = class ChartE extends ChartConstructor {
  initChart() {
    const root = this.root;

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(70),
        innerRadius: am5.percent(40),
        y: am5.percent(-8),
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country",
      })
    );

    series
      .get("colors")
      .set("colors", [
        am5.color("#f560e6"),
        am5.color("#9567d8"),
        am5.color("#ffb27d"),
      ]);
    series.data.setAll(donutData);

    // Disabling labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    //let legendRoot = am5.Root.new(this.$refs.donutLegend);

    let legend = chart.children.push(
      am5.Legend.new(root, {
        // width: am5.percent(100),
        centerX: am5.percent(50),
        x: am5.percent(50),
        y: am5.percent(90),
        layout: am5.GridLayout.new(root, {
          // fixedWidthGrid: true,
        }),
      })
    );

    legend.labels.template.setAll({
      text: "country",
      fontSize: 15,
      fontWeight: "500",
    });

    legend.valueLabels.template.setAll({
      text: "{country}",
      fontSize: 15,
      fontWeight: "500",
    });

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    legend.data.setAll(series.dataItems);

    return { chart, series: [series] };
  }
};
