import { ISelected } from "../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "./typeKeys";

export interface ISelectBackendAction {
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK;
  payload: ISelected;
}

const selectBackendFrameworkAction = (
  backendFramework: ISelected
): ISelectBackendAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_BACKEND_FRAMEWORK,
  payload: backendFramework
});

export { selectBackendFrameworkAction };
