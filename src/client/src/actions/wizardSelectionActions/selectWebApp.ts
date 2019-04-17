import { ISelected } from "../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "./typeKeys";

export interface ISelectProjectTypeAction {
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_WEB_APP;
  payload: ISelected;
}

const selectWebAppAction = (
  selectedApp: ISelected
): ISelectProjectTypeAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_WEB_APP,
  payload: selectedApp
});

export { selectWebAppAction };
