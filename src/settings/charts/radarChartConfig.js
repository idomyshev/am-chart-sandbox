import {
  __animationSettings,
  __featureSettings,
} from "@/settings/charts/__reusedSettings";

export const radarChartConfig = () => {
  return {
    general: {
      features: __featureSettings(),
    },
    labels: {
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
    animation: __animationSettings(),
  };
};
