import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";

export interface ISelectFrontendAction {
    type: USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK;
    payload: ISelected;
}

export interface ISelectBackendAction {
    type: USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK;
    payload: ISelected;
}