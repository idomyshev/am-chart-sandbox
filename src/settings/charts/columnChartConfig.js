export const columnChartConfig = () => {
  return {
    axisY: {
      title: "Axis Y",
      items: {
        strokeOpacity: {
          value: 0.5,
          type: "text-field.number",
        },
        strokeWidth: {
          value: 2,
          type: "text-field.number",
        },
        stroke: {
          value: "666",
          type: "text-field.color",
        },
      },
    },

    axisX: {
      title: "Axis X",
      items: {
        strokeOpacity: {
          value: 0.5,
          type: "text-field.number",
        },
        strokeWidth: {
          value: 2,
          type: "text-field.number",
        },
        stroke: {
          value: "666",
          type: "text-field.color",
        },
        startLocation: {
          value: 0,
          type: "text-field.number",
        },
        endLocation: {
          value: 1,
          type: "text-field.number",
        },
      },
    },
  };
};

// export const getChartConfig = () => {
//   return chartConfig;
// };
