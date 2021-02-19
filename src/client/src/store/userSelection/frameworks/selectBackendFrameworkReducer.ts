import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";
import WizardSelectionActionType from "../selectionActionType";

const initialState = {
  title: "",
  internalName: "",
  icon: "",
  version: "",
  author: "",
};

const backendFramework = (state: ISelected = initialState, action: WizardSelectionActionType) : ISelected => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
