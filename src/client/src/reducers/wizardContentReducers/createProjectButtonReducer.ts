import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import { IUpdateCreateProjectButton } from "../../actions/wizardInfoActions/updateCreateProjectButton";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

const createProjectButton = (
  state: boolean = false,
  action: IUpdateCreateProjectButton | WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_PROJECT_BUTTON:
      return action.payload;
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
      const newState = false;
      return newState;
    default:
      return state;
  }
};

export default createProjectButton;
