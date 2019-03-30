import * as Actions from "../../actions/types";

/* State Shape
{
    [key: string]: number
}
*/

export interface IPageCount {
  [key: string]: number;
}

const initialState = {};

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
