import { IRoutesNavItems } from "../../../types/route";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { IRoutesActionType } from "./models";

const setRoutesAction = (routes: IRoutesNavItems[]): IRoutesActionType => ({
  payload: routes,
  type: TEMPLATES_TYPEKEYS.SET_ROUTES,
});

export { setRoutesAction };
