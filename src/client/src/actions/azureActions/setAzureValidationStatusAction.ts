import { AZURE_TYPEKEYS } from "./typeKeys";

export interface IAzureValidationStatus {
  type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS;
  payload: boolean;
}

export const setAzureValidationStatusAction = (
  status: boolean
): IAzureValidationStatus => ({
  payload: status,
  type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS
});
