import { WIZARD_CONTENT_TYPEKEYS } from "../../actions/wizardContentActions/typeKeys";
import WizardContentActionType from "../../actions/wizardContentActions/wizardContentActionType";
import { IOption } from "../../types/option";
import { IResetPagesAction } from "../../actions/wizardSelectionActions/selectPages";

/* State Shape
{
    pageOptions: IOption[]
}
*/

const pageOptions = (
  state: IOption[] = [],
  action: WizardContentActionType | IResetPagesAction
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default pageOptions;
