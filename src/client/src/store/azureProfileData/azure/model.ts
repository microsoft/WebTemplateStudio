import { AZURE_TYPEKEYS } from "../typeKeys";

export interface IAvailabilityFromExtensionAction {
  isAvailable: boolean;
  message: string;
}

export interface IAzureValidationStatusAction {
  type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS;
  payload: boolean;
}

export interface IGetSubscriptionAction {
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA;
  payload: SubscriptionData;
}