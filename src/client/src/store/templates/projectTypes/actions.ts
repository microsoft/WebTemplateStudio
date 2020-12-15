import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IProjectTypesActionType } from "./models";

const setProjectTypesAction = (projectTypes: IOption[]): IProjectTypesActionType => ({
  payload: projectTypes,
  type: TEMPLATES_TYPEKEYS.SET_PROJECT_TYPES,
});

export { setProjectTypesAction };
