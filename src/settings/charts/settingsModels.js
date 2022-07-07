const settingsModels = {
  animation: {
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
  bullets: {
    radius: {
      type: "text-field.number",
      defaultValue: 5,
    },
    fill: {
      type: "color",
      defaultValue: "#B0CB3543",
    },
    strokeWidth: {
      type: "text-field.number",
      defaultValue: 2,
    },
    stroke: {
      type: "color",
      defaultValue: "#247A2DFF",
    },
  },
  features: {
    animation: {
      type: "checkbox",
      defaultValue: true,
    },
    axes: {
      type: "checkbox",
      defaultValue: true,
    },
    bullets: {
      type: "checkbox",
      defaultValue: true,
    },
    columnTemplate: {
      type: "checkbox",
      defaultValue: true,
    },
    cursor: {
      type: "checkbox",
      defaultValue: true,
    },
    grid: {
      type: "checkbox",
      defaultValue: true,
    },
    labels: {
      type: "checkbox",
      defaultValue: true,
    },
    legend: {
      type: "checkbox",
      defaultValue: true,
    },
    ticks: {
      type: "checkbox",
      defaultValue: true,
    },
  },
  labels: {
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
  legend: {
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
  ticks: {
    color: {
      value: "666",
      type: "text-field.color",
    },
    width: {
      value: 2,
      type: "text-field.number",
    },
    stroke: {
      value: "666",
      type: "text-field.color",
    },
    strokeWidth: {
      value: 2,
      type: "text-field.number",
    },
  },
};

export const getSettingModel = (settingGroup, settingName, propertyName) => {
  if (settingsModels[settingGroup] === undefined) {
    console.error(
      `getSettingModel() call for no existent setting group '${settingGroup}'.`
    );
    return null;
  } else if (settingsModels[settingGroup][settingName] === undefined) {
    console.error(
      `getSettingModel() call for no existent setting '${settingGroup}.${settingName}'.`
    );
    return null;
  } else if (
    settingsModels[settingGroup][settingName][propertyName] === undefined
  ) {
    console.error(
      `getSettingModel() call for no existent setting property '${settingGroup}.${settingName}.${propertyName}'.`
    );
    return null;
  }

  return settingsModels[settingGroup][settingName];
};
