import { ROUTES } from "../../utils/constants";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";


const wizardNavigation = (
  state: string = "/",
  action: WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE:
      return action.payload;
    default:
      return state;
  }
};

export default wizardNavigation;
