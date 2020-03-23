import { WIZARD_INFO_TYPEKEYS } from "../../store/wizardContent/typeKeys";
import WizardInfoType from "../../store/wizardContent/wizardInfoActionType";


const wizardNavigation = (
  state = "/",
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
