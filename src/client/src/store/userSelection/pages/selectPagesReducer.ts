import { ISelected } from "../../../types/selected";
import WizardSelectionActionType from "../selectionActionType";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";

const pagesReducer = (state: ISelected[] = [], action: WizardSelectionActionType): ISelected[] => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_PAGES:
      const newPages: ISelected[] = [...action.payload];
      return newPages;
    case USERSELECTION_TYPEKEYS.SELECT_PAGE:
      const list = state.slice(0);
      list.filter((page) => page.id === action.payload.id)[0] = action.payload;
      return list;
    default:
      return state;
  }
};

export default pagesReducer;
