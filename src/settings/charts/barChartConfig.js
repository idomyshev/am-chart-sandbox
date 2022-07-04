import { __featureSettings } from "@/settings/charts/__reusedSettings";

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
        animateSpeedOnDrop: {
          value: 600,
          type: "text-field.number",
        },
      },
    },
  };
};
