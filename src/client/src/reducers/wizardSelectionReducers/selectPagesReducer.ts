import * as Actions from "../../actions/types";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

/* State Shape
{
    pages: PageOption[]
}

PageOption = {
    "Name": string,
    "Template": string
}
*/

const pagesReducer = (state: any[] = [{
  title: "Blank Page",
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.BLANK_PAGE,
  originalTitle: "Blank Page",
  id: "Blank Page"
}], action: any) => {
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
