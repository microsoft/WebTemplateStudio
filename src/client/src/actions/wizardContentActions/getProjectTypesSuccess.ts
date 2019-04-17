import { IOption } from "../../types/option";
import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";

export interface IProjectTypesActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_PROJECT_TYPES_SUCCESS;
  payload: IOption[];
}

const getProjectTypesSuccess = (items: IOption[]): IProjectTypesActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.GET_PROJECT_TYPES_SUCCESS,
  payload: items
});

export { getProjectTypesSuccess };
