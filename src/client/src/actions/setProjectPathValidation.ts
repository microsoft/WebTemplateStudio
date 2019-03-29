import * as Actions from "./types";

export const setProjectPathValidation = (validation: any) => ({
  type: Actions.SET_PROJECT_PATH_VALIDATION,
  payload: validation
});
