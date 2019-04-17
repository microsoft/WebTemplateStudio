import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { IValidation } from "./updateOutputPath";
import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

/* State Shape
{
    projectName: string,
    validation: {
      isValid: false,
      error: string
    }
}
*/

export interface IProjectName {
  projectName: string;
  validation: IValidation;
}

const initialState = {
  projectName: "",
  validation: {
    isValid: false,
    error: ""
  }
};

const projectNameReducer = (
  state: IProjectName = initialState,
  action: WizardSelectionActionType | WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.UPDATE_PROJECT_NAME:
      return action.payload;
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
      return initialState;
    default:
      return state;
  }
};

export default projectNameReducer;
