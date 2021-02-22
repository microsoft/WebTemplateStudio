import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import WizardSelectionActionType from "../selectionActionType";
import { ISelected } from "../../../types/selected";

const initialState = {
  title: "",
  internalName: "",
  icon: "",
  description: "",
};

const projectType = (state: ISelected = initialState, action: WizardSelectionActionType): ISelected => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE:
      return action.payload;
    default:
      return state;
  }
};

export default projectType;
