import * as Actions from "../../actions/types";
import { ISelected } from "../../types/selected";

/* State Shape
{
    frontendFramework: ""
}
*/

// TODO: Default state to remove once API is hooked up
const frontendFramework = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.SELECT_FRONTEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default frontendFramework;
