import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";


export interface IRoutesActionType {
  type: TEMPLATES_TYPEKEYS.SET_ROUTES;
  payload: string[];
}