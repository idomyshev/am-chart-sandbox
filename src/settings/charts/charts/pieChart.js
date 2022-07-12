export default () => {
  return {
    meta: {
      series: ["Cafe", "Food"],
    },
    settings: {
      animation: {
        chartAppear: 200,
        chartOpacityAppear: 200,
        seriesAppearTime: [3000, 10000],
      },
      general: {
        _noSubGroup: {
          customColors: {
            value: true,
            type: "radio",
          },
        },
      },
      chart: {
        _noSubGroup: {
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
        cafe: {
          __type: "series",
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
        cafe: {
          __type: "series",
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
        cafe: {
          __type: "series",
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
      legend: {
        cafe: {
          __type: "series",
          centerX: {
            value: 50,
            type: "text-field.number",
          },
          x: {
            value: 50,
            type: "text-field.number",
          },
          y: {
            value: 1,
            type: "text-field.number",
          },
        },
      },
      ticks: {
        cafe: {
          __type: "series",
          enabled: {
            value: true,
            type: "radio",
          },
          width: {
            value: 1,
            type: "text-field.number",
          },
          color: {
            value: "000",
            type: "text-field.color",
          },
        },
      },
      tooltips: {
        cafe: {
          __type: "series",
          enabled: {
            value: true,
            type: "radio",
          },
          text: {
            value:
              "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})",
            type: "text-field.text",
          },
        },
      },
      series: {
        food: {
          __type: "series",
          enabled: {
            value: true,
            type: "radio",
          },
          startAngle: {
            value: 0,
            type: "text-field.number",
          },
          endAngle: {
            value: 135,
            type: "text-field.number",
          },
        },
      },
    },
  };
};
