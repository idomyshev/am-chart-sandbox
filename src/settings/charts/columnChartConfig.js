export const columnChartConfig = () => {
  return {
    axes: {
      y: {
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
      x: {
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

    grid: {
      y: {
        stroke: {
          value: "666",
          type: "text-field.color",
        },
        strokeWidth: {
          value: 2,
          type: "text-field.number",
        },
      },
      x: {
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

    ticks: {
      y: {
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
      x: {
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
