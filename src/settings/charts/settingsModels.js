import { getSettingsSet } from "@/helpers/settings";

export const settingsModels = {
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

const enabledSettingsUnprepared = getSettingsSet("pieChart", "features");
export const enabledSettingsFeatures = settingsFeatures.filter((el) => {
  return enabledSettingsUnprepared.some((x) => x === el);
});

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
