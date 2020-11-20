import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import WizardSelectionActionType from "../selectionActionType";
import { WIZARD_PROJECT_TYPE } from "../../../utils/constants/internalNames";
import { DEVELOPMENT } from "../../../utils/constants/constants";

//TODO: need to be changed/improved #1664 
//TODO: decide from command Palette launch command
const devProjectType = WIZARD_PROJECT_TYPE.FULL_STACK_APP;
const initialState = (process.env.NODE_ENV === DEVELOPMENT) ? devProjectType : WIZARD_PROJECT_TYPE.FULL_STACK_APP;

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
