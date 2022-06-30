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

    gridY: {
      title: "GridY",
      items: {
        enabled: {
          value: true,
          type: "radio",
        },
        stroke: {
          value: "666",
          type: "text-field.color",
        },
        strokeWidth: {
          value: 2,
          type: "text-field.number",
        },
      },
    },

    gridX: {
      title: "GridX",
      items: {
        enabled: {
          value: true,
          type: "radio",
        },
        stroke: {
          value: "666",
          type: "text-field.color",
        },
        strokeWidth: {
          value: 2,
          type: "text-field.number",
        },
      },
    },
  };
};
