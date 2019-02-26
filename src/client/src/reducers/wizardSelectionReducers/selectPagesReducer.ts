import * as Actions from "../../actions/types";

/* State Shape
{
    pages: PageOption[]
}

PageOption = {
    "Name": string,
    "Template": string
}
*/

const pagesReducer = (state: any[] = [], action: any) => {
  switch (action.type) {
    case Actions.SELECT_PAGES:
      // FIXME: Define proper types
      const newPages: any[] = [...action.payload];
      return newPages;
    default:
      return state;
  }
};

export default pagesReducer;
