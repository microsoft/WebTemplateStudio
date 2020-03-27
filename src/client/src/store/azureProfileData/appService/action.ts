import { ISelectedAppService } from "./model";
import { ISaveAppServiceSettingsAction, IRemoveAppServiceSettingsAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";

export const saveAppServiceSettingsAction = (
  appServiceSettings: ISelectedAppService
): ISaveAppServiceSettingsAction => ({
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS,
  payload: appServiceSettings
});

export const removeAppServiceSettingsAction = (): IRemoveAppServiceSettingsAction => ({
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS
});