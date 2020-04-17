import { IAzureValidationStatusAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";

export const setAzureValidationStatusAction = (
    status: boolean
  ): IAzureValidationStatusAction => ({
    payload: status,
    type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS
  });
