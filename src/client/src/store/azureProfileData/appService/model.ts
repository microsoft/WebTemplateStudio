import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtensionAction } from "../azure/model";
import { FormattedMessage } from "react-intl";

export interface ISaveAppServiceSettingsAction {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS;
  payload: ISelectedAppServiceReducer;
}

export interface IRemoveAppServiceSettingsAction {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS;
}

export interface ISetAppServiceSiteNameAvailabilityAction {
  type: AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY;
  payload: IAvailabilityFromExtensionAction;
}

export interface IAvailabilityReducer {
  isSiteNameAvailable: boolean;
  message: string;
}

export interface ISelectedAppServiceReducer {
  subscription: string;
  resourceGroup: string;
  siteName: string;
  internalName: string;
}

interface IServiceContentReducer {
  serviceType: FormattedMessage.MessageDescriptor;
}

export interface IAppServiceReducer {
  siteNameAvailability: IAvailabilityReducer;
  selection: ISelectedAppServiceReducer | null;
  wizardContent: IServiceContentReducer;
}