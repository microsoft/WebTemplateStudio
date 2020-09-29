import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";
import WizardSelectionActionType from "../selectionActionType";

const initialState = {
  title: "",
  internalName: "",
  svgBase64: "",
  version: "",
  author: "",
};

const frontendFramework = (state: ISelected = initialState, action: WizardSelectionActionType) => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default frontendFramework;
