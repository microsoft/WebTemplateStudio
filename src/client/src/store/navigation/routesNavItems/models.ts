import { TEMPLATES_TYPEKEYS } from "../../templates/templateTypeKeys";
import { IRoutesNavItems } from "../../../types/route";


export interface IRoutesActionType {
  type: TEMPLATES_TYPEKEYS.SET_ROUTES;
  payload: IRoutesNavItems[];
}