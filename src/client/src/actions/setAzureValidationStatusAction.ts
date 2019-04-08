import * as Actions from "./types";

export const setAzureValidationStatusAction = (status: boolean) => ({
  payload: status,
  type: Actions.SET_VALIDATION_STATUS
});
