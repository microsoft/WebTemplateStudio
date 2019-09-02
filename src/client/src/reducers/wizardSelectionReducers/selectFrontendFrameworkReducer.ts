import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { ISelected } from "../../types/selected";
import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";

/* State Shape
{
    frontendFramework: ""
}
*/

const initialState = {
  title: "",
  internalName: "",
  version: "",
  author: ""
};

// TODO: Default state to remove once API is hooked up
const frontendFramework = (
  state: ISelected = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default frontendFramework;
