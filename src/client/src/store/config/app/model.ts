import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";

export interface ISelectProjectTypeAction {
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_WEB_APP;
  payload: ISelected;
}