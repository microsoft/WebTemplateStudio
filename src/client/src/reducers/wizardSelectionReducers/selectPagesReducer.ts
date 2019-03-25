import * as Actions from "../../actions/types";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
import { ISelected } from "../../types/selected";

/* State Shape
{
    pages: ISelected[]
}
*/

const DEFAULT_PAGE_NAME = "Html Blank"

const pagesReducer = (state: ISelected[] = [{
  title: DEFAULT_PAGE_NAME,
  internalName: WIZARD_CONTENT_INTERNAL_NAMES.BLANK_PAGE,
  defaultName: DEFAULT_PAGE_NAME,
  id: DEFAULT_PAGE_NAME
}], action: any) => {
  switch (action.type) {
    case Actions.SELECT_PAGES:
      const newPages: ISelected[] = [...action.payload];
      return newPages;
    default:
      return state;
  }
};

export default pagesReducer;
