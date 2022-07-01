export const radarChartConfig = () => {
  return {
    general: {
      _noSubGroup: {
        radius: {
          value: 10,
          type: "text-field.number",
        },
      },
    },
    strokes: {
      _noSubGroup: {
        strokeWidth: {
          value: 2,
          type: "text-field.number",
        },
      },
    },
    bullets: {
      _noSubGroup: {
        radius: {
          value: 5,
          type: "text-field.number",
        },
      },
    },
    animation: {
      _noSubGroup: {
        seriesAppear: {
          value: 1000,
          type: "text-field.number",
        },
        chartOpacityAppear: {
          value: 1000,
          type: "text-field.number",
        },
        chartAppear: {
          value: 100,
          type: "text-field.number",
        },
      },
    },
  };
};
