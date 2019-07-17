import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import { IUpdateCreateProjectButton } from "../../actions/wizardInfoActions/updateCreateProjectButton";

const createProjectButton = (
  state: boolean = false,
  action: IUpdateCreateProjectButton
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.UPDATE_CREATE_PROJECT_BUTTON:
      return action.payload;
    default:
      return state;
  }
};

export default createProjectButton;
