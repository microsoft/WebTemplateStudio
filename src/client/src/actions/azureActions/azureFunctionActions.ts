import { AZURE_TYPEKEYS } from "./typeKeys";

const updateAzureFunctionNamesAction = (functionApp: {
  appIndex: number;
  functionNames: string[];
}) => ({
  type: AZURE_TYPEKEYS.UPDATE_AZURE_FUNCTION_NAMES,
  payload: functionApp
});

const saveAzureFunctionsSettingsAction = (azureFunctionsSettings: any) => ({
  type: AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS,
  payload: azureFunctionsSettings
});

const removeAzureFunctionAction = (functionIndex: number) => ({
  type: AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTION,
  payload: functionIndex
});

const removeAzureFunctionAppAction = (appIndex: number) => ({
  type: AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTIONS_APP,
  payload: appIndex
});

export {
  updateAzureFunctionNamesAction,
  removeAzureFunctionAction,
  removeAzureFunctionAppAction,
  saveAzureFunctionsSettingsAction
};
