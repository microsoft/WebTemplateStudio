import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";
import AzureActionType from "../../actions/azureActions/azureActionType";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

const setValidationStatus = (
  state = false,
  action: AzureActionType | WizardInfoType
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SET_VALIDATION_STATUS:
      return action.payload;
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
      return false;
    default:
      return state;
  }
};
export default setValidationStatus;
