import * as Actions from "./types";

export const setAccountAvailability = (isAccountAvailableObject: any) => ({
    type: Actions.SET_ACCOUNT_AVAILABILITY,
    payload: isAccountAvailableObject
});
