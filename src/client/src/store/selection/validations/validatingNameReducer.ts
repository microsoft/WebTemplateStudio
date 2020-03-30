import { AZURE_TYPEKEYS } from "../../azureProfileData/typeKeys";
import AzureActionType from "../../azureProfileData/azureActionType";

const setValidationStatus = (state = false, action: AzureActionType) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SET_VALIDATION_STATUS:
      return action.payload;
    default:
      return state;
  }
};
export default setValidationStatus;
