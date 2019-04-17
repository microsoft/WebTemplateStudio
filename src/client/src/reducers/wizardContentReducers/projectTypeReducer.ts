import * as Actions from "../../actions/types";
import { IOption } from "../../types/option";

/* State Shape
{
    projectTypes: []
}
*/

const projectTypes = (state: IOption[] = [], action: any) => {
  switch (action.type) {
    case Actions.GET_PROJECT_TYPES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypes;
