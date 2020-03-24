import { AZURE_TYPEKEYS } from "../typeKeys";

export interface IAvailabilityFromExtension {
  isAvailable: boolean;
  message: string;
}

export interface IAzureValidationStatus {
  type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS;
  payload: boolean;
}

export interface IGetSubscription {
  type: AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA;
  payload: any;
}