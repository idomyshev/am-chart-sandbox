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
      no_subGroup: {
        gridContainerToFront: {
          value: true,
          type: "radio",
        },
      },
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

    labels: {
      y: {
        fill: {
          value: "666",
          type: "text-field.color",
        },
        fontSize: {
          value: 1,
          type: "text-field.number",
        },
      },
      x: {
        fill: {
          value: "666",
          type: "text-field.color",
        },
        fontSize: {
          value: 1,
          type: "text-field.number",
        },
      },
    },

    cursor: {
      no_subGroup: {
        enabled: {
          value: true,
          type: "radio",
        },
      },
    },

    legend: {
      food: {
        centerX: {
          value: 0,
          type: "text-field.number",
        },
        x: {
          value: 10,
          type: "text-field.number",
        },
        y: {
          value: 100,
          type: "text-field.number",
        },
      },
    },
  };
};
