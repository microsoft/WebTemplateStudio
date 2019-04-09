import * as Actions from "../../actions/types";

/* State Shape
{
    backendFramework: ""
}
*/

const backendFramework = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.SELECT_BACKEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
