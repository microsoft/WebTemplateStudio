import { ROUTES } from "../../utils/constants";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../actions/wizardInfoActions/wizardInfoActionType";

export interface IRoutes {
  [key: string]: boolean;
}

const initialState = {
  [ROUTES.NEW_PROJECT]: true,
  [ROUTES.SELECT_PROJECT_TYPE]: false,
  [ROUTES.SELECT_FRAMEWORKS]: false,
  [ROUTES.SELECT_PAGES]: false,
  [ROUTES.AZURE_LOGIN]: false,
  [ROUTES.REVIEW_AND_GENERATE]: false
};

const wizardNavigation = (
  state: IRoutes = initialState,
  action: WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE:
      const newSelectionState = {
        ...state,
        [action.payload]: true
      };
      return newSelectionState;
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
      return initialState;
    default:
      return state;
  }
};

export default wizardNavigation;
