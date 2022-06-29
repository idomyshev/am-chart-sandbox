const chartSettings = {
  general: {
    title: "General",
    itemsPosition: "column",
    items: {
      customColors: {
        value: true,
        type: "radio",
      },
    },
  },

  chart: {
    title: "Chart",
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
    title: "Labels ('cafe' series)",
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
  slices: {
    title: "Slices ('cafe' series)",
    items: {
      enabled: {
        value: true,
        type: "radio",
      },
      opacity: {
        value: 1,
        type: "text-field.number",
      },
      borderWidth: {
        value: 2,
        type: "text-field.number",
      },
      borderColor: {
        value: "fff",
        type: "text-field.color",
      },
    },
  },
  clickedSlices: {
    title: "Clicked slices ('cafe' series)",
    items: {
      enabled: {
        value: true,
        type: "radio",
      },
      customStyle: {
        value: true,
        type: "checkbox",
      },
      radius: {
        value: 10,
        type: "text-field.number",
      },
      borderWidth: {
        value: 2,
        type: "text-field.number",
      },
      borderColor: {
        value: "fff",
        type: "text-field.color",
      },
    },
  },
};

export const getChartSettings = () => {
  return chartSettings;
};
