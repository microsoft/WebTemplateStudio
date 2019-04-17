import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";
import AzureActionType from "../../actions/azureActions/azureActionType";

const setValidationStatus = (state = false, action: AzureActionType) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SET_VALIDATION_STATUS:
      return action.payload;
    default:
      return state;
  }
};
export default setValidationStatus;
