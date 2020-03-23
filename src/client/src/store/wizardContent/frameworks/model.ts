import { WIZARD_CONTENT_TYPEKEYS } from "../../../actions/wizardContentActions/typeKeys";
import { IOption } from "../../../types/option";

export interface IUpdateFrameworkActionType {
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK;
  payload: IOption[];
}