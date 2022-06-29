const chartSettings = {
  // customColors: {
  //   value: true,
  //   type: "boolean",
  // },
  chart: {
    radius: {
      value: 80,
      type: "number",
    },
    innerRadius: {
      value: 55,
      type: "number",
    },
  },
};

export const getChartSettings = () => {
  return chartSettings;
};

const a = {
  b: {
    c: true,
  },
};

console.log("abc", a.b.c);

const d = { "a.b.c": 123 };
console.log("d", d["a.b.c"]);

// if (d["a.b.c"]) {
// }
