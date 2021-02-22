import { ISelected } from "../../../types/selected";
import WizardSelectionActionType from "../selectionActionType";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";

const initialState = {
  title: "",
  internalName: "",
  icon: "",
  version: "",
  author: "",
};

const frontendFramework = (state: ISelected = initialState, action: WizardSelectionActionType): ISelected => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default frontendFramework;
