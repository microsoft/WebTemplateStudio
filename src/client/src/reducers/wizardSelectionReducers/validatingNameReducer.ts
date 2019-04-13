import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";

const setValidationStatus = (state = false, action: any) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SET_VALIDATION_STATUS:
      return action.payload;
    default:
      return state;
  }
};
export default setValidationStatus;
