import { AZURE_TYPEKEYS } from "../typeKeys";

export interface IAzureValidationStatusAction {
  type: AZURE_TYPEKEYS.SET_VALIDATION_STATUS;
  payload: boolean;
}