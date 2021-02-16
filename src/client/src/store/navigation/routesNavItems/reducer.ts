import { IRoutesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { IRoutesNavItems } from "../../../types/route";

const routeNavItemsOptions = (state: IRoutesNavItems[] = [], action: IRoutesActionType) : IRoutesNavItems[] => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

export default routeNavItemsOptions;
