import { AZURE_TYPEKEYS } from "./typeKeys";
import { ISelectedAppService } from "../../reducers/wizardSelectionReducers/services/appServiceReducer";

export interface ISaveAppServiceSettings {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS;
  payload: ISelectedAppService;
}

export interface IRemoveAppServiceSettings {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS;
}

const saveAppServiceSettingsAction = (
  appServiceSettings: ISelectedAppService
): ISaveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS,
  payload: appServiceSettings
});

const removeAppServiceSettingsAction = (): IRemoveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS
});

export { saveAppServiceSettingsAction, removeAppServiceSettingsAction };