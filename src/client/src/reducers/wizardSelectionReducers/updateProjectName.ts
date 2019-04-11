import * as Actions from "../../actions/types";
import { IValidation } from "./updateOutputPath";

/* State Shape
{
    projectName: string,
    validation: {
      isValid: false,
      error: string
    }
}
*/

interface IProjectName {
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
  action: any
) => {
  switch (action.type) {
    case Actions.UPDATE_PROJECT_NAME:
      return action.payload;
    default:
      return state;
  }
};

export default projectNameReducer;
