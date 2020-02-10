import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import { IOption } from "../../types/option";

export interface IBackendFrameworksSuccessActionType {
  type: WIZARD_CONTENT_TYPEKEYS.SET_BACKEND_FRAMEWORKS;
  payload: IOption[];
}

export const setBackendFrameworksAction = (
  frameworks: IOption[]
): IBackendFrameworksSuccessActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.SET_BACKEND_FRAMEWORKS,
  payload: frameworks
});
