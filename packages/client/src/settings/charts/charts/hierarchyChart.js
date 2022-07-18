import { hierarchyMockData } from "@/mockData/hierarchyMockData";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as am5 from "@amcharts/amcharts5";

const initChart = (root) => {
  const chart = root.container.children.push(
    am5.Container.new(root, {
      width: am5.percent(100),
      height: am5.percent(100),
      layout: root.verticalLayout,
    })
  );

  const series = chart.children.push(
    am5hierarchy.ForceDirected.new(root, {
      singleBranchOnly: false,
      downDepth: 1,
      topDepth: 1,
      maxRadius: 25,
      minRadius: 12,
      valueField: "value",
      categoryField: "name",
      childDataField: "children",
      idField: "name",
      linkWithStrength: 0.3,
      linkWithField: "linkWith",
      manyBodyStrength: -15,
      centerStrength: 0.5,
    })
  );

  series.get("colors").set("step", 2);

  series.data.setAll([hierarchyMockData]);
  series.set("selectedDataItem", series.dataItems[0]);

  return [chart, series];
};

export default { initChart, initConfig: () => {} };
