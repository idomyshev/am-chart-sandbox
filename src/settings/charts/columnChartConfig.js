export const columnChartConfig = () => {
  return {
    axisY: {
      title: "axisY",
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
      title: "axisX",
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
      title: "gridY",
      items: {
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
      title: "gridX",
      items: {
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

    ticksY: {
      title: "ticksY",
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

    ticksX: {
      title: "ticksX",
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
