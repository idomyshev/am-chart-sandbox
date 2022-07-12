export const settingsModels = {
  animation: {
    chartAppear: {
      type: "number",
      defaultValue: 100,
    },
    chartOpacityAppear: {
      type: "number",
      defaultValue: 1000,
    },
    seriesAppearTime: {
      serial: true,
      type: "number",
      defaultValue: 1000,
    },
    animateSpeedOnDrop: {
      type: "number",
      defaultValue: 600,
    },
  },
  axes: {
    xStrokeOpacity: {
      type: "number",
      defaultValue: 0.9,
    },
    xStrokeWidth: {
      type: "number",
      defaultValue: 2,
    },
    xStroke: {
      type: "color",
      defaultValue: "#f33",
    },
    yStrokeOpacity: {
      type: "number",
      defaultValue: 0.9,
    },
    yStrokeWidth: {
      type: "number",
      defaultValue: 2,
    },
    yStroke: {
      type: "color",
      defaultValue: "#f33",
    },
  },
  bullets: {
    radius: {
      serial: true,
      type: "number",
      defaultValue: 5,
    },
    fill: {
      serial: true,
      type: "color",
      defaultValue: "#B0CB3543",
    },
    strokeWidth: {
      serial: true,
      type: "number",
      defaultValue: 2,
    },
    stroke: {
      serial: true,
      type: "color",
      defaultValue: "#247A2DFF",
    },
  },
  grid: {
    xStrokeWidth: {
      type: "number",
      defaultValue: 1,
    },
    xStroke: {
      type: "color",
      defaultValue: "#333",
    },
    yStrokeWidth: {
      type: "number",
      defaultValue: 1,
    },
    yStroke: {
      type: "color",
      defaultValue: "#333",
    },
  },
  labels: {
    xFontSize: {
      type: "number",
      defaultValue: 1,
    },
    xFill: {
      type: "color",
      defaultValue: "#69f",
    },
    yFontSize: {
      type: "number",
      defaultValue: 1,
    },
    yFill: {
      type: "color",
      defaultValue: "#69f",
    },
    inside: {
      defaultValue: true,
      type: "checkbox",
    },
    circular: {
      defaultValue: true,
      type: "checkbox",
    },
    radius: {
      defaultValue: 80,
      type: "number",
    },
  },
  legend: {
    centerX: {
      defaultValue: 50,
      type: "number",
    },
    x: {
      defaultValue: 30,
      type: "number",
    },
    y: {
      defaultValue: 98,
      type: "number",
    },
  },
  ticks: {
    yStroke: {
      defaultValue: "#3f3",
      type: "color",
    },
    yStrokeWidth: {
      defaultValue: 2,
      type: "number",
    },
    xStroke: {
      defaultValue: "#3f3",
      type: "color",
    },
    xStrokeWidth: {
      defaultValue: 2,
      type: "number",
    },
  },
};

export const getSettingsModel = (modelName) => {
  if (settingsModels[modelName] === undefined) {
    console.error(
      `getSettingsModel() call for no existent setting group '${modelName}'.`
    );
    return null;
  }
  return Object.entries(settingsModels[modelName]);
};

export const getSettingsModelProperty = (
  settingsGroup,
  settingName,
  propertyName
) => {
  if (settingsModels[settingsGroup] === undefined) {
    console.error(
      `getSettingsModelProperty() call for no existent setting group '${settingsGroup}'.`
    );
    return null;
  } else if (settingsModels[settingsGroup][settingName] === undefined) {
    console.error(
      `getSettingsModelProperty() call for no existent setting '${settingsGroup}.${settingName}'.`
    );
    return null;
  } else if (
    settingsModels[settingsGroup][settingName][propertyName] === undefined
  ) {
    console.error(
      `getSettingsModelProperty() call for no existent setting property '${settingsGroup}.${settingName}.${propertyName}'.`
    );
    return null;
  }

  return settingsModels[settingsGroup][settingName];
};

export const settingsFeatures = Object.keys(settingsModels);

export const getSettingGroupMeta = (groupName, metaName, showError) => {
  if (!settingsModels[groupName]) {
    if (showError) {
      console.error(`Setting group '${groupName}' not exist`);
    }
    return "";
  } else if (!settingsModels[groupName][`__${metaName}`]) {
    if (showError) {
      console.error(`Setting group meta '${groupName}.${metaName}' not exist`);
    }
    return "";
  }
  return settingsModels[groupName][`__${metaName}`];
};
