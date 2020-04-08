import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";

export interface ISelectFrontendAction {
    type: WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK;
    payload: ISelected;
}

export interface ISelectBackendAction {
    type: WIZARD_SELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK;
    payload: ISelected;
}