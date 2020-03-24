import { AZURE_TYPEKEYS } from "../../store/azure/typeKeys";

export interface IAvailabilityFromExtension {
  isAvailable: boolean;
  message: string;
}

export interface ISetCosmosAccountNameAvailability {
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY;
  payload: IAvailabilityFromExtension;
}


export const setAccountAvailability = (
  isAccountAvailableObject: IAvailabilityFromExtension
): ISetCosmosAccountNameAvailability => ({
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY,
  payload: isAccountAvailableObject
});

