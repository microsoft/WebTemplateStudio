import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";
import { ISelected } from "../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

/* State Shape
{
    pages: ISelected[]
}
*/

const pagesReducer = (
  state: ISelected[] = [],
  action: WizardSelectionActionType | WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES:
      const newPages: ISelected[] = [...action.payload];
      return newPages;
    case WIZARD_SELECTION_TYPEKEYS.RESET_PAGES:
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
      return [];
    default:
      return state;
  }
};

export default pagesReducer;
