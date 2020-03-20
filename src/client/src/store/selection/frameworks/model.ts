import { WIZARD_SELECTION_TYPEKEYS } from "../../../actions/wizardSelectionActions/typeKeys";
import { ISelected } from "../../../types/selected";

export interface ISelectFrontendAction {
    type: WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK;
    payload: ISelected;
}