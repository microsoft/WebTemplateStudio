
import { IRoutesActionType } from "./models";
import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";

const setRoutesAction = (routes: string[]): IRoutesActionType => ({
  payload: routes,
  type: TEMPLATES_TYPEKEYS.SET_ROUTES,
});

export { setRoutesAction };
