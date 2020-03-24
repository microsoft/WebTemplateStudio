import { AZURE_TYPEKEYS } from "../../../actions/azureActions/typeKeys";
import { ISelectedAppService } from "../../../reducers/wizardSelectionReducers/services/appServiceReducer";

export interface ISaveAppServiceSettings {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS;
  payload: ISelectedAppService;
}

export interface IRemoveAppServiceSettings {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS;
}