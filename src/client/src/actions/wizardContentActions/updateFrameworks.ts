import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import { IOption } from "../../types/option";

export interface IUpdateFrameworkActionType {
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK;
  payload: IOption[];
}

export const updateFrameworks = (
  frameworks: IOption[]
): IUpdateFrameworkActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK,
  payload: frameworks
});
