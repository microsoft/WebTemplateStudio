import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";
import WizardSelectionActionType from "../selectionActionType";

const initialState = {
  title: "",
  internalName: "",
  version: "",
  author: ""
};

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
