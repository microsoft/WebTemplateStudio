import { WIZARD_CONTENT_TYPEKEYS } from "../../actions/wizardContentActions/typeKeys";
import WizardContentActionType from "../../actions/wizardContentActions/wizardContentActionType";
import { IOption } from "../../types/option";

/* State Shape
{
    projectTypes: []
}
*/

const projectTypes = (
  state: IOption[] = [],
  action: WizardContentActionType
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.GET_PROJECT_TYPES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypes;
