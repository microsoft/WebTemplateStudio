import { ISelectedAppService } from "../../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { ISaveAppServiceSettings, IRemoveAppServiceSettings, ISetAppServiceSiteNameAvailability } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";

export const saveAppServiceSettingsAction = (
  appServiceSettings: ISelectedAppService
): ISaveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS,
  payload: appServiceSettings
});

export const removeAppServiceSettingsAction = (): IRemoveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS
});
