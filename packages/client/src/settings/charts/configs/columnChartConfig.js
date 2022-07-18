import { __greenBullets } from "@/settings/charts/sharedSettings";

export const columnChartConfig = () => {
  return {
    axes: {
      y: {
        __type: "axis",
        strokeOpacity: {
          value: 0.5,
          type: "number",
        },
        strokeWidth: {
          value: 2,
          type: "number",
        },
        stroke: {
          value: "666",
          type: "color",
        },
      },
      x: {
        __type: "axis",
        strokeOpacity: {
          value: 0.5,
          type: "number",
        },
        strokeWidth: {
          value: 2,
          type: "number",
        },
        stroke: {
          value: "666",
          type: "color",
        },
        startLocation: {
          value: 0,
          type: "number",
        },
        endLocation: {
          value: 1,
          type: "number",
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
          type: "color",
        },
        strokeWidth: {
          value: 2,
          type: "number",
        },
      },
      x: {
        __type: "axis",
        stroke: {
          value: "666",
          type: "color",
        },
        strokeWidth: {
          value: 2,
          type: "number",
        },
      },
    },

    ticks: {
      y: {
        __type: "axis",
        stroke: {
          value: "666",
          type: "color",
        },
        strokeWidth: {
          value: 2,
          type: "number",
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
          type: "color",
        },
        strokeWidth: {
          value: 2,
          type: "number",
        },
      },
    },

    labels: {
      y: {
        __type: "axis",
        fill: {
          value: "666",
          type: "color",
        },
        fontSize: {
          value: 1,
          type: "number",
        },
      },
      x: {
        __type: "axis",
        fill: {
          value: "666",
          type: "color",
        },
        fontSize: {
          value: 1,
          type: "number",
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
          type: "number",
        },
        x: {
          value: 10,
          type: "number",
        },
        y: {
          value: 100,
          type: "number",
        },
      },
    },
    bullets: __greenBullets(),
  };
};
