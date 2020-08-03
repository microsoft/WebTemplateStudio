
import { IRoutesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { IRoutesNavItems } from "../../../types/route";

const setRoutesAction = (routes: IRoutesNavItems[]): IRoutesActionType => ({
  payload: routes,
  type: TEMPLATES_TYPEKEYS.SET_ROUTES,
});

export { setRoutesAction };
