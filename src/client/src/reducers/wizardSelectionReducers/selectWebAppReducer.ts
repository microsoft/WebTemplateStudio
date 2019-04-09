import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";
import { ISelected } from "../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { AnyAction } from "redux";

/* State Shape
{
    appType: ""
}
*/

const webAppReducer = (
  state: ISelected = {
    title: "Fullstack Web Application",
    internalName: "FullStackWebApp"
  },
  action: AnyAction
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_WEB_APP:
      return action.payload;
    default:
      return state;
  }
};

export default webAppReducer;
