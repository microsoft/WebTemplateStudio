import { ROUTES } from "../../../utils/constants";
import { WIZARD_INFO_TYPEKEYS } from "../../wizardContent/typeKeys";
import WizardInfoType from "../../wizardContent/wizardInfoActionType";

export interface IRoutes {
  [key: string]: boolean;
}

const initialState = {
  [ROUTES.NEW_PROJECT]: true,
  [ROUTES.SELECT_FRAMEWORKS]: false,
  [ROUTES.SELECT_PAGES]: false,
  [ROUTES.AZURE_LOGIN]: false,
  [ROUTES.REVIEW_AND_GENERATE]: false
};

export const isVisited = (
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
    case WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE:
        return initialState;
    default:
      return state;
  }
};

export const selected = (
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
