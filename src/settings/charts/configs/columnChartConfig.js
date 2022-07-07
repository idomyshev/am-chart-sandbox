import { __greenBullets } from "@/settings/charts/sharedSettings";

export const columnChartConfig = () => {
  return {
    axes: {
      y: {
        __type: "axis",
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
        __type: "axis",
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
      _noSubGroup: {
        gridContainerToFront: {
          value: true,
          type: "radio",
        },
      },
      y: {
        __type: "axis",
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
        __type: "axis",
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
        __type: "axis",
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
        __type: "axis",
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
        __type: "axis",
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
        __type: "axis",
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
      _noSubGroup: {
        enabled: {
          value: true,
          type: "radio",
        },
      },
    },

    legend: {
      food: {
        __type: "series",
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
    bullets: __greenBullets(),
  };
};
