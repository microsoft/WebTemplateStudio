import * as Actions from "./types";

const updateAzureFunctionNamesAction = (functionApp: {
  appIndex: number;
  functionNames: string[];
}) => ({
  type: Actions.UPDATE_AZURE_FUNCTION_NAMES,
  payload: functionApp
});

const saveAzureFunctionsSettingsAction = (azureFunctionsSettings: any) => ({
  type: Actions.SAVE_AZURE_FUNCTIONS_SETTINGS,
  payload: azureFunctionsSettings
});

const removeAzureFunctionAction = (functionIndex: number) => ({
  type: Actions.REMOVE_AZURE_FUNCTION,
  payload: functionIndex
});

const removeAzureFunctionAppAction = (appIndex: number) => ({
  type: Actions.REMOVE_AZURE_FUNCTIONS_APP,
  payload: appIndex
});

export {
  updateAzureFunctionNamesAction,
  removeAzureFunctionAction,
  removeAzureFunctionAppAction,
  saveAzureFunctionsSettingsAction
};
