import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtensionAction } from "../azure/model";
import { FormattedMessage } from "react-intl";

export interface ISaveAppServiceSettingsAction {
  type: AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS;
  payload: ISelectedAppService;
}

export interface IRemoveAppServiceSettingsAction {
  type: AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS;
}

export interface ISetAppServiceSiteNameAvailabilityAction {
  type: AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY;
  payload: IAvailabilityFromExtensionAction;
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

interface IServiceContent {
  serviceType: FormattedMessage.MessageDescriptor;
}

export interface IAppService {
  siteNameAvailability: IAvailability;
  selection: ISelectedAppService | null;
  wizardContent: IServiceContent;
}