import { IOption } from "../../../types/option";
import { IUpdateFrameworkActionType } from "./model";
import { WIZARD_CONTENT_TYPEKEYS } from "../../../actions/wizardContentActions/typeKeys";

export const updateFrameworksAction = (
  frameworks: IOption[]
): IUpdateFrameworkActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK,
  payload: frameworks
});
