export const hierarchyMockData = {
  name: "Root",
  value: 0,
  children: [
    {
      name: "1",
      linkWith: ["2"],
      children: [
        {
          name: "A",
          children: [
            { name: "A1", value: 1 },
            { name: "A2", value: 1 },
            { name: "A3", value: 1 },
            { name: "A4", value: 1 },
            { name: "A5", value: 1 },
          ],
        },
        {
          name: "B",
          children: [
            { name: "B1", value: 1 },
            { name: "B2", value: 1 },
            { name: "B3", value: 1 },
            { name: "B4", value: 1 },
            { name: "B5", value: 1 },
          ],
        },
        {
          name: "C",
          children: [
            { name: "C1", value: 1 },
            { name: "C2", value: 1 },
            { name: "C3", value: 1 },
            { name: "C4", value: 1 },
            { name: "C5", value: 1 },
          ],
        },
      ],
    },

    {
      name: "2",
      linkWith: ["3"],
      children: [
        {
          name: "D",
          value: 1,
        },
        {
          name: "E",
          value: 1,
        },
      ],
    },
    {
      name: "3",
      children: [
        {
          name: "F",
          children: [
            { name: "F1", value: 1 },
            { name: "F2", value: 1 },
            { name: "F3", value: 1 },
            { name: "F4", value: 1 },
            { name: "F5", value: 1 },
          ],
        },
        {
          name: "H",
          children: [
            { name: "H1", value: 1 },
            { name: "H2", value: 1 },
            { name: "H3", value: 1 },
            { name: "H4", value: 1 },
            { name: "H5", value: 1 },
          ],
        },
        {
          name: "G",
          children: [
            { name: "G1", value: 1 },
            { name: "G2", value: 1 },
            { name: "G3", value: 1 },
            { name: "G4", value: 1 },
            { name: "G5", value: 1 },
          ],
        },
      ],
    },
  ],
};
