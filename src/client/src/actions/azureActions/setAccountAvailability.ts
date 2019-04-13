import { AZURE_TYPEKEYS } from "./typeKeys";
import { IAvailability } from "../../reducers/wizardSelectionReducers/services/cosmosDbReducer";

export interface ISetCosmosAccountNameAvailability {
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY;
  payload: IAvailability;
}

export interface ISetAzureFunctionsAppNameAvailability {
  type: AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY;
  payload: IAvailability;
}

export const setAccountAvailability = (
  isAccountAvailableObject: IAvailability
): ISetCosmosAccountNameAvailability => ({
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY,
  payload: isAccountAvailableObject
});

export const setAppNameAvailabilityAction = (
  isAppNameAvailableObject: IAvailability
): ISetAzureFunctionsAppNameAvailability => ({
  type: AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY,
  payload: isAppNameAvailableObject
});
