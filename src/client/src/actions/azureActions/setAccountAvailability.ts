import { AZURE_TYPEKEYS } from "./typeKeys";

export const setAccountAvailability = (isAccountAvailableObject: any) => ({
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY,
  payload: isAccountAvailableObject
});

export const setAppNameAvailabilityAction = (
  isAppNameAvailableObject: any
) => ({
  type: AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY,
  payload: isAppNameAvailableObject
});
