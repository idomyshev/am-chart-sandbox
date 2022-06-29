const chartSettings = {
  general: {
    title: "General settings",
    itemsPosition: "column",
    items: {
      customColors: {
        value: true,
        type: "radio",
      },
    },
  },

  chart: {
    title: "Chart settings",
    itemsPosition: "column",
    items: {
      radius: {
        value: 80,
        type: "text-field.number",
      },
      innerRadius: {
        value: 55,
        type: "text-field.number",
      },
    },
  },
  labels: {
    title: "Labels settings (per series)",
    items: {
      enabled: {
        value: true,
        type: "radio",
      },
      inside: {
        value: true,
        type: "checkbox",
      },
      circular: {
        value: true,
        type: "checkbox",
      },
      radius: {
        value: 80,
        type: "text-field.number",
      },
    },
  },
};

export const getChartSettings = () => {
  return chartSettings;
};
