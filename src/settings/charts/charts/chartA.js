export default () => {
  return {
    meta: {
      features: ["bullets"],
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
            type: "number",
          },
          innerRadius: {
            value: 55,
            type: "number",
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
            type: "number",
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
            type: "number",
          },
          borderWidth: {
            value: 2,
            type: "number",
          },
          borderColor: {
            value: "fff",
            type: "color",
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
            type: "number",
          },
          borderWidth: {
            value: 2,
            type: "number",
          },
          borderColor: {
            value: "fff",
            type: "color",
          },
        },
      },
      legend: {
        cafe: {
          __type: "series",
          centerX: {
            value: 50,
            type: "number",
          },
          x: {
            value: 50,
            type: "number",
          },
          y: {
            value: 1,
            type: "number",
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
            type: "number",
          },
          color: {
            value: "000",
            type: "color",
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
            type: "number",
          },
          endAngle: {
            value: 135,
            type: "number",
          },
        },
      },
    },
  };
};
