import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";
import { IProjectName } from "../../../reducers/wizardSelectionReducers/updateProjectName";

export interface ISelectProjectTypeAction {
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_WEB_APP;
  payload: ISelected;
}

export interface ISetProjectNameActionType {
    type: WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_NAME;
    payload: IProjectName;
}

export interface IUpdateProjectPathActionType {
    type: WIZARD_SELECTION_TYPEKEYS.SET_OUTPUT_PATH;
    payload: string;
}
  