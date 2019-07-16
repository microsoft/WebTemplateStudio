import { AZURE_TYPEKEYS } from "./typeKeys";

export interface ISaveAppServiceSettings {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS;
  payload: any;
}

export interface IRemoveAppServiceSettings {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS;
}

const saveAppServiceSettingsAction = (
  appServiceSettings: any
): ISaveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS,
  payload: appServiceSettings
});

const removeAppServiceSettingsAction = (): IRemoveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS
});

export { saveAppServiceSettingsAction, removeAppServiceSettingsAction };
