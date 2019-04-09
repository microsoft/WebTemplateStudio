import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { IValidation } from "./updateOutputPath";
import { AnyAction } from "redux";

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
  action: AnyAction
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.UPDATE_PROJECT_NAME:
      return action.payload;
    default:
      return state;
  }
};

export default projectNameReducer;
