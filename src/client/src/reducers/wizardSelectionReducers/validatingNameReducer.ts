import { AZURE_TYPEKEYS } from "../../store/azure/typeKeys";
import AzureActionType from "../../store/azure/azureActionType";

const setValidationStatus = (state = false, action: AzureActionType) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SET_VALIDATION_STATUS:
      return action.payload;
    default:
      return state;
  }
};
export default setValidationStatus;
