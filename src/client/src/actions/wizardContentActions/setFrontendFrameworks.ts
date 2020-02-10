import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import { IOption } from "../../types/option";

export interface IFrontendFrameworksActionType {
  type: WIZARD_CONTENT_TYPEKEYS.SET_FRONTEND_FRAMEWORKS;
  payload: IOption[];
}

export const setFrontendFrameworksAction = (
  frameworks: IOption[]
): IFrontendFrameworksActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.SET_FRONTEND_FRAMEWORKS,
  payload: frameworks
});
