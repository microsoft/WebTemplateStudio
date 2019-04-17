import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";

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

const pageCountReducer = (
  state: IPageCount = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.UPDATE_PAGE_COUNT:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default pageCountReducer;
