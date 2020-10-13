import { SERVICES_TYPEKEYS } from "../typeKeys";

export interface ISaveAppServiceAction {
  type: SERVICES_TYPEKEYS.SAVE_APP_SERVICE;
  payload: IAppService;
}

export interface IRemoveAppServiceAction {
  type: SERVICES_TYPEKEYS.REMOVE_APP_SERVICE;
}

export interface IAppService {
  subscription: string;
  resourceGroup: string;
  location: string;
  siteName: string;
  internalName: string;
  icon: string;
  editable?: boolean;
}
