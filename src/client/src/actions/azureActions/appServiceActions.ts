import { AZURE_TYPEKEYS } from "./typeKeys";
import { IAppServiceState } from "../../containers/AppServiceModal";

export interface ISaveAppServiceSettings {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS;
  payload: IAppServiceState;
}

export interface IRemoveAppServiceSettings {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS;
}

const saveAppServiceSettingsAction = (
  appServiceSettings: IAppServiceState
): ISaveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS,
  payload: appServiceSettings
});

const removeAppServiceSettingsAction = (): IRemoveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS
});

export { saveAppServiceSettingsAction, removeAppServiceSettingsAction };
