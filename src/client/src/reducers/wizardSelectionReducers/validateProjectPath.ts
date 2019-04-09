import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { AnyAction } from "redux";

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

const projectPathValidation = (
  state: IProjectPathValidation = {},
  action: AnyAction
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION:
      return action.payload;
    default:
      return state;
  }
};

export default projectPathValidation;
