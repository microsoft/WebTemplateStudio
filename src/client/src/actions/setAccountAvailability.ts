import * as Actions from "./types";

export const setAccountAvailability = (isAccountAvailable: any) => ({
    type: Actions.SET_ACCOUNT_AVAILABILITY,
    payload: isAccountAvailable
});
