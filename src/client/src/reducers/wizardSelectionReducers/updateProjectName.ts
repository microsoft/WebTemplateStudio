import * as Actions from "../../actions/types";

/* State Shape
{
    projectName: ""
}
*/

const projectNameReducer = (
  state = { projectName: "", validation: {} },
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
