import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";

export interface ISaveAppServiceAction {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE;
  payload: ISelectedAppService;
}

export interface IRemoveAppServiceAction {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE;
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
