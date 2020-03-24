import { ISelectedAppService } from "../../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { ISaveAppServiceSettings, IRemoveAppServiceSettings } from "./model";
import { AZURE_TYPEKEYS } from "../../../actions/azureActions/typeKeys";

export const saveAppServiceSettingsAction = (
  appServiceSettings: ISelectedAppService
): ISaveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS,
  payload: appServiceSettings
});

export const removeAppServiceSettingsAction = (): IRemoveAppServiceSettings => ({
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS
});