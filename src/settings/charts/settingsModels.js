import { getSettingsSet } from "@/helpers/settings";

export const settingsModels = {
  animation: {
    chartAppear: {
      type: "text-field.number",
      defaultValue: 100,
    },
    chartOpacityAppear: {
      type: "text-field.number",
      defaultValue: 1000,
    },
    seriesAppearTime: {
      serial: true,
      type: "text-field.number",
      defaultValue: 1000,
    },
    animateSpeedOnDrop: {
      type: "text-field.number",
      defaultValue: 600,
    },
  },
  bullets: {
    radius: {
      serial: true,
      type: "text-field.number",
      defaultValue: 5,
    },
    fill: {
      serial: true,
      type: "color",
      defaultValue: "#B0CB3543",
    },
    strokeWidth: {
      serial: true,
      type: "text-field.number",
      defaultValue: 2,
    },
    stroke: {
      serial: true,
      type: "color",
      defaultValue: "#247A2DFF",
    },
  },
  labels: {
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
      type: "text-field.number",
    },
  },
  legend: {
    centerX: {
      defaultValue: 50,
      type: "text-field.number",
    },
    x: {
      defaultValue: 50,
      type: "text-field.number",
    },
    y: {
      defaultValue: 1,
      type: "text-field.number",
    },
  },
  ticks: {
    color: {
      defaultValue: "666",
      type: "text-field.color",
    },
    width: {
      defaultValue: 2,
      type: "text-field.number",
    },
    stroke: {
      defaultValue: "666",
      type: "text-field.color",
    },
    strokeWidth: {
      defaultValue: 2,
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
