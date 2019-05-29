import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

/* State Shape
{
    [key: string]: number
}
*/

export interface IPageCount {
  [key: string]: number;
}

const initialState = {};

const pageCountReducer = (
  state: IPageCount = initialState,
  action: WizardSelectionActionType | WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.UPDATE_PAGE_COUNT:
      return {
        ...action.payload
      };
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
      return initialState;
    default:
      return state;
  }
};

export default pageCountReducer;
