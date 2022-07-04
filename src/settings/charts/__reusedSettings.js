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
    general: {
      value: true,
    },
    animation: {
      value: true,
      type: "radio",
    },
  };
};
