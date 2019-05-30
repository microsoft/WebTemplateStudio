import { AZURE_TYPEKEYS } from "./typeKeys";

export interface IAvailabilityFromExtension {
  isAvailable: boolean;
  message: string;
}

export interface ISetCosmosAccountNameAvailability {
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY;
  payload: IAvailabilityFromExtension;
}

export interface ISetAzureFunctionsAppNameAvailability {
  type: AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY;
  payload: IAvailabilityFromExtension;
}

export const setAccountAvailability = (
  isAccountAvailableObject: IAvailabilityFromExtension
): ISetCosmosAccountNameAvailability => ({
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY,
  payload: isAccountAvailableObject
});

export const setAppNameAvailabilityAction = (
  isAppNameAvailableObject: IAvailabilityFromExtension
): ISetAzureFunctionsAppNameAvailability => ({
  type: AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY,
  payload: isAppNameAvailableObject
});
