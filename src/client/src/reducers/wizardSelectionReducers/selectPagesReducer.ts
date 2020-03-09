import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";
import { ISelected } from "../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";

/* State Shape
{
    pages: ISelected[]
}
*/

const pagesReducer = (
  state: ISelected[] = [],
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES:
      const newPages: ISelected[] = [...action.payload];
      return newPages;
    case WIZARD_SELECTION_TYPEKEYS.SELECT_PAGE:
      const list = state.slice(0);
      list.filter(page => page.id===action.payload.id)[0] = action.payload;
      return list;
    case WIZARD_SELECTION_TYPEKEYS.RESET_PAGES:
      return [];
    default:
      return state;
  }
};

export default pagesReducer;
