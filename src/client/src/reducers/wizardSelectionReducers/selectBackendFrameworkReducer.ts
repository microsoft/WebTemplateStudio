import { WIZARD_SELECTION_TYPEKEYS } from "../../store/selection/typeKeys";
import { ISelected } from "../../types/selected";
import WizardSelectionActionType from "../../store/selection/selectionActionType";

/* State Shape
{
    backendFramework: ISelected
}
*/

const initialState = {
  title: "",
  internalName: "",
  version: "",
  author: ""
};

const backendFramework = (
  state: ISelected = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
