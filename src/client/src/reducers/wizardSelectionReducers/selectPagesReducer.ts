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

const pagesReducer = (state = [], action: any) => {
  switch (action.type) {
    case Actions.SELECT_PAGES:
      return action.payload;
    default:
      return state;
  }
};

export default pagesReducer;
