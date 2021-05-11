import { ISelected } from "../../../types/selected";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelectBackendAction, ISelectFrontendAction } from "./model";

export const setSelectedFrontendFrameworkAction = (frontendFramework: ISelected): ISelectFrontendAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK,
  payload: frontendFramework,
});

export const setSelectedBackendFrameworkAction = (backendFramework: ISelected): ISelectBackendAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK,
  payload: backendFramework,
});
