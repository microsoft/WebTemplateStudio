import { ISelected } from "../../../types/selected";
import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { ISelectFrontendAction } from "./model";

const setSelectedFrontendFrameworkAction = (
  frontendFramework: ISelected
): ISelectFrontendAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_FRONTEND_FRAMEWORK,
  payload: frontendFramework
});

export { setSelectedFrontendFrameworkAction };