import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";

export interface IProjectTypesActionType {
  type: TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES;
  payload: IOption[];
}
