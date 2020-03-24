import { IAzureValidationStatus } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";

export const setAzureValidationStatusAction = (
    status: boolean
  ): IAzureValidationStatus => ({
    payload: status,
    type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS
  });
  