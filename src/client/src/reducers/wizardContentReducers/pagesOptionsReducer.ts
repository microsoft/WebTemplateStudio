import * as Actions from "../../actions/types";
import { IOption } from "../../types/option";

/* State Shape
{
    pageOptions: IOption[]
}
*/

const pageOptions = (state: IOption[] = [], action: any) => {
  switch (action.type) {
    case Actions.GET_PAGES_OPTIONS_SUCCESS:
      return action.payload;
    case Actions.GET_PAGES_OPTIONS:
    default:
      return state;
  }
};

export default pageOptions;
