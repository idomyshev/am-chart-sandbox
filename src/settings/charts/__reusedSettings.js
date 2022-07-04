export const __animationSettings = () => {
  return {
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
  };
};

export const __featureSettings = () => {
  return {
    __title: "Enabled features",
    __bold: true,
    _noSubGroup: {
      __alignment: "flex",
      features: {
        value: true,
      },
      animation: {
        value: true,
        type: "checkbox",
      },
      axes: {
        value: true,
        type: "checkbox",
      },
      cursor: {
        value: true,
        type: "checkbox",
      },
      grid: {
        value: true,
        type: "checkbox",
      },
      ticks: {
        value: true,
        type: "checkbox",
      },
      labels: {
        value: true,
        type: "checkbox",
      },
      legend: {
        value: true,
        type: "checkbox",
      },
    },
  };
};
