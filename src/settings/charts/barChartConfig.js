import {
  __animationSettings,
  __featureSettings,
} from "@/settings/charts/__reusedSettings";

export const barChartConfig = () => {
  return {
    features: __featureSettings(),
    columnTemplate: {
      _noSubGroup: {
        draggable: {
          value: true,
          type: "radio",
        },
        cursorOverStyle: {
          value: "pointer",
          type: "text-field.text",
        },
        tooltipText: {
          value: "drag to rearrange",
          type: "text-field.text",
        },
        cornerRadiusBR: {
          value: 10,
          type: "text-field.number",
        },
        cornerRadiusTR: {
          value: 10,
          type: "text-field.number",
        },
      },
    },
    animation: __animationSettings(),
  };
};
