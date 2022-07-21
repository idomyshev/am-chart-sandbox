import { lang } from "@/settings/lang";

export const validationRules = {
  chartName(val) {
    if (!val) {
      return lang.pleaseInputChartName;
    }
    return true;
  },
  chartTemplate(val) {
    if (!val) {
      return lang.pleaseChooseChartTemplate;
    }
    return true;
  },
};
