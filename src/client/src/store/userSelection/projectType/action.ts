import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelectProjectTypeAction } from "./model";

export const setSelectedFrontendFrameworkAction = (
  projectType: string
): ISelectProjectTypeAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE,
  payload: projectType
});