import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import WizardSelectionActionType from "../selectionActionType";
import { projectType } from "../../../AppContext";

//TODO this will vary depending on the new page
const initialState = projectType;

const backendFramework = (state: string = initialState, action: WizardSelectionActionType) => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
