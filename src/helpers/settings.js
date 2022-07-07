import { settingsSets } from "@/settings/charts/settingsSets";

export const getSettingsSet = (setName, groupName) => {
  if (
    settingsSets[setName] === undefined ||
    settingsSets[setName][groupName] === undefined
  ) {
    return undefined;
  }
  return settingsSets[setName][groupName];
};
