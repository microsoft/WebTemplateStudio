import { ROUTE } from "../../../utils/constants/routes";
import { IRoutes } from "../../userSelection/pages/model";
import { NAVIGATION_ROUTES_TYPEKEYS } from "../../navigation/typeKeys";
import RootAction from "../../ActionType";

const initialState = {
  [ROUTE.NEW_PROJECT]: true,
  [ROUTE.SELECT_FRAMEWORKS]: false,
  [ROUTE.ADD_PAGES]: false,
  [ROUTE.ADD_SERVICES]: false,
  [ROUTE.REVIEW_AND_GENERATE]: false
};

export const isVisited = (
  state: IRoutes = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case NAVIGATION_ROUTES_TYPEKEYS.SET_VISITED_WIZARD_PAGE:
      const newUserSelectionState = {
        ...state,
        [action.payload]: true
      };
      return newUserSelectionState;
    case NAVIGATION_ROUTES_TYPEKEYS.RESET_VISITED_WIZARD_PAGE:
        return initialState;
    default:
      return state;
  }
};

export const selected = (
  state = "/",
  action: RootAction
) => {
  switch (action.type) {
    case NAVIGATION_ROUTES_TYPEKEYS.SET_PAGE_WIZARD_PAGE:
      return action.payload;
    default:
      return state;
  }
};