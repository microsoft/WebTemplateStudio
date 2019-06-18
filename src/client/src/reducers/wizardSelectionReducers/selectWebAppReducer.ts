import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";
import { ISelected } from "../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

/* State Shape
{
    appType: ""
}
*/

const initialState = {
  title: "Fullstack Web Application",
  internalName: "FullStackWebApp",
  version: "v1.0",
  licenses: ""
};

const webAppReducer = (
  state: ISelected = initialState,
  action: WizardSelectionActionType | WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SELECT_WEB_APP:
      return action.payload;
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
      return initialState;
    default:
      return state;
  }
};

export default webAppReducer;
