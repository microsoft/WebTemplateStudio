import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { ISelected } from "../../types/selected";
import { AnyAction } from "redux";

/* State Shape
{
    frontendFramework: ""
}
*/

// TODO: Default state to remove once API is hooked up
const frontendFramework = (
  state: ISelected = {
    title: "",
    internalName: "",
    version: ""
  },
  action: AnyAction
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default frontendFramework;
