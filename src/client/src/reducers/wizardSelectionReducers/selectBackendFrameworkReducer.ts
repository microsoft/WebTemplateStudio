import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { ISelected } from "../../types/selected";
import { AnyAction } from "redux";

/* State Shape
{
    backendFramework: ISelected
}
*/

// TODO: Default state to remove once API is hooked up
const backendFramework = (
  state: ISelected = {
    title: "",
    internalName: "",
    version: ""
  },
  action: AnyAction
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
