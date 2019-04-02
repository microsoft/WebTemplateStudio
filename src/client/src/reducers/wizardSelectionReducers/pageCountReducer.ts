import * as Actions from "../../actions/types";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

/* State Shape
{
    [key: string]: number
}
*/

export interface IPageCount {
  [key: string]: number;
}

const initialState = {
  [WIZARD_CONTENT_INTERNAL_NAMES.BLANK_PAGE]: 1
};

const pageCountReducer = (state: IPageCount = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_PAGE_COUNT:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default pageCountReducer;
