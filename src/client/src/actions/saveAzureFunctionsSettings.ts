import * as Actions from "./types";

const saveAzureFunctionsSettingsAction = (azureFunctionsSettings: any) => ({
  type: Actions.SAVE_AZURE_FUNCTIONS_SETTINGS,
  payload: azureFunctionsSettings
});

export { saveAzureFunctionsSettingsAction };
