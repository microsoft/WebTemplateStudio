import { defineMessages } from "react-intl";

export const messages = defineMessages({
  siteNameLabel: {
    id: "appServiceModal.siteNameLabel",
    defaultMessage: "Site Name"
  },
  ariaSiteNameLabel: {
    id: "appServiceModal.siteNameLabel",
    defaultMessage: "Site Name Dropdown"
  },
  siteNameSubLabel: {
    id: "appServiceModal.siteNameSubLabel",
    defaultMessage: "Create a unique site name"
  },
  // TODO maybe move these to centralized place?
  runtimeStackLabel: {
    id: "azureFunctionsModal.runtimeStackLabel",
    defaultMessage: "Runtime Stack"
  },
  runtimeStackSubLabel: {
    id: "azureFunctionsModal.runtimeStackSubLabel",
    defaultMessage: "Your runtime stack is {runtimeStack}"
  }
});
