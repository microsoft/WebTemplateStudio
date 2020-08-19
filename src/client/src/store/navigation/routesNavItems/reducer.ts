import { IRoutesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { IRoutesNavItems } from "../../../types/route";

const projectTypesOptions = (state: IRoutesNavItems[] = [], action: IRoutesActionType) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

export default projectTypesOptions;