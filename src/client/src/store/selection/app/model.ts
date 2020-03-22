import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";
import { IProjectName } from "../../../reducers/wizardSelectionReducers/updateProjectName";

export interface ISelectProjectTypeAction {
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_WEB_APP;
  payload: ISelected;
}

export interface IUpdateProjectNameActionType {
    type: WIZARD_SELECTION_TYPEKEYS.UPDATE_PROJECT_NAME;
    payload: IProjectName;
}

export interface IUpdateProjectPathActionType {
    type: WIZARD_SELECTION_TYPEKEYS.UPDATE_OUTPUT_PATH;
    payload: string;
}
  