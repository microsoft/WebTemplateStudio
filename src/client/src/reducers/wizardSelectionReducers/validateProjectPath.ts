import * as Actions from "../../actions/types";

/* State Shape
{
    projectPathValidation: {
        isInvalidProjectPath: boolean,
        projectPathError: string
    }
}
*/

const projectPathValidation = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.SET_PROJECT_PATH_VALIDATION:
      return action.payload;
    default:
      return state;
  }
};

export default projectPathValidation;
