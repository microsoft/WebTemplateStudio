import * as Actions from "../../actions/types";
import { ROUTES } from "../../utils/constants";

export interface IRoutes {
  [key: string]: boolean;
}

const initialState = {
  [ROUTES.WELCOME]: true,
  [ROUTES.SELECT_PROJECT_TYPE]: false,
  [ROUTES.SELECT_FRAMEWORKS]: false,
  [ROUTES.SELECT_PAGES]: false,
  [ROUTES.AZURE_LOGIN]: false,
  [ROUTES.REVIEW_AND_GENERATE]: false
};

const wizardNavigation = (state: IRoutes = initialState, action: any) => {
  switch (action.type) {
    case Actions.SET_VISITED_WIZARD_PAGE:
      const newSelectionState = {
        ...state,
        [action.payload]: true
      };
      return newSelectionState;
    default:
      return state;
  }
};

export default wizardNavigation;
