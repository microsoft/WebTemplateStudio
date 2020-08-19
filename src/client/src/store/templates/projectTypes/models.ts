import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";

export interface IProjectTypesActionType {
  type: TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES;
  payload: string[];
}
