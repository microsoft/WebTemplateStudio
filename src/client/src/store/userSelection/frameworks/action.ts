import { ISelected } from "../../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { ISelectFrontendAction, ISelectBackendAction } from "./model";

export const setSelectedFrontendFrameworkAction = (
  frontendFramework: ISelected
): ISelectFrontendAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK,
  payload: frontendFramework
});

export const setSelectedBackendFrameworkAction = (
  backendFramework: ISelected
): ISelectBackendAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK,
  payload: backendFramework
});