import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";

export interface ISaveAppServiceSettingsAction {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS;
  payload: ISelectedAppService;
}

export interface IRemoveAppServiceSettingsAction {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS;
}

export interface IAvailability {
  isSiteNameAvailable: boolean;
  message: string;
}

export interface ISelectedAppService {
  subscription: string;
  resourceGroup: string;
  location: string;
  siteName: string;
  internalName: string;
}

export interface IAppService {
  selection: ISelectedAppService | null;
}