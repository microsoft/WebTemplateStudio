import * as Actions from "./types";

export const setAccountAvailability = (isAccountAvailableObject: any) => ({
  type: Actions.SET_ACCOUNT_AVAILABILITY,
  payload: isAccountAvailableObject
});

export const setAppNameAvailabilityAction = (
  isAppNameAvailableObject: any
) => ({
  type: Actions.SET_APP_NAME_AVAILABILITY,
  payload: isAppNameAvailableObject
});
