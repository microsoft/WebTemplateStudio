import { IRoutesNavItems } from "../../../types/route";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { IRoutesActionType } from "./models";

const routeNavItemsOptions = (state: IRoutesNavItems[] = [], action: IRoutesActionType): IRoutesNavItems[] => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

export default routeNavItemsOptions;
