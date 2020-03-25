import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import WizardSelectionActionType from "../selectionActionType";

/* State Shape
{
    projectPathValidation: {
        isInvalidProjectPath: boolean,
        projectPathError: string
    }
}
*/

interface IProjectPathValidation {
  isInvalidProjectPath?: boolean;
  projectPathError?: string;
}

const initialState = {};

const projectPathValidation = (
  state: IProjectPathValidation = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION:
      return action.payload;
    default:
      return state;
  }
};

export default projectPathValidation;
