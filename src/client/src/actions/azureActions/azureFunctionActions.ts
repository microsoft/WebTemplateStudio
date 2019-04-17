import { AZURE_TYPEKEYS } from "./typeKeys";

export interface IFunctionApp {
  appIndex: number;
  functionNames: string[];
}

export interface IUpdateFunctionNamesAction {
  type: AZURE_TYPEKEYS.UPDATE_AZURE_FUNCTION_NAMES;
  payload: IFunctionApp;
}

export interface ISaveAzureFunctionsSettings {
  type: AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS;
  payload: any;
}

export interface IRemoveAzureFunction {
  type: AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTION;
  payload: number;
}

export interface IRemoveAzureFunctionApp {
  type: AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTIONS_APP;
  payload: number;
}

const updateAzureFunctionNamesAction = (functionApp: {
  appIndex: number;
  functionNames: string[];
}): IUpdateFunctionNamesAction => ({
  type: AZURE_TYPEKEYS.UPDATE_AZURE_FUNCTION_NAMES,
  payload: functionApp
});

const saveAzureFunctionsSettingsAction = (
  azureFunctionsSettings: any
): ISaveAzureFunctionsSettings => ({
  type: AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS,
  payload: azureFunctionsSettings
});

const removeAzureFunctionAction = (
  functionIndex: number
): IRemoveAzureFunction => ({
  type: AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTION,
  payload: functionIndex
});

const removeAzureFunctionAppAction = (
  appIndex: number
): IRemoveAzureFunctionApp => ({
  type: AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTIONS_APP,
  payload: appIndex
});

export {
  updateAzureFunctionNamesAction,
  removeAzureFunctionAction,
  removeAzureFunctionAppAction,
  saveAzureFunctionsSettingsAction
};
