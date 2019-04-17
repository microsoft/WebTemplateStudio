import { FormattedMessage } from "react-intl";
import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";

/* State Shape
{
    outputPath: string,
    validation: {
      isValid: false,
      error: string
    }
}
*/

export interface IValidation {
  isValid: boolean;
  error: string | FormattedMessage.MessageDescriptor;
}

export interface IOutputPath {
  outputPath: string;
  validation?: IValidation;
}

const initialState = {
  outputPath: "",
  validation: undefined
};

const outputPathReducer = (
  state: IOutputPath = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.UPDATE_OUTPUT_PATH:
      return {
        ...state,
        outputPath: action.payload
      };
    case WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION:
      return {
        ...state,
        validation: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default outputPathReducer;
