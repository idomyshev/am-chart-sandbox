export const __animationSettings = () => {
  return {
    _noSubGroup: {
      chartAppear: {
        value: 100,
        type: "text-field.number",
      },
      chartOpacityAppear: {
        value: 1000,
        type: "text-field.number",
      },
      seriesAppear: {
        value: 1000,
        type: "text-field.number",
      },
      animateSpeedOnDrop: {
        value: 600,
        type: "text-field.number",
      },
    },
  };
};

export const __bulletsSettings = () => {
  return {
    _noSubGroup: {
      radius: {
        value: 5,
        type: "text-field.number",
      },
      fill: {
        value: "#fff",
        type: "color",
      },
      strokeWidth: {
        value: undefined,
        type: "text-field.number",
      },
      stroke: {
        value: "#0000FF00",
        type: "color",
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
      bullets: {
        value: false,
        type: "checkbox",
      },
      columnTemplate: {
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

export const __greenBullets = () => {
  return {
    _noSubGroup: {
      radius: {
        value: 5,
        type: "text-field.number",
      },
      fill: {
        value: "#B0CB3543",
        type: "color",
      },
      strokeWidth: {
        value: 2,
        type: "text-field.number",
      },
      stroke: {
        value: "#247A2DFF",
        type: "color",
      },
    },
  };
};
