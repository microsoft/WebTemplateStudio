import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import WizardSelectionActionType from "../selectionActionType";

const initialState = "FullStackWebApp";

const backendFramework = (
  state: string = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
