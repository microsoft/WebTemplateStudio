import { ISelected } from "../../../types/selected";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelectProjectTypeAction } from "./model";

export const setSelectedProjectTypeAction = (projectType: ISelected): ISelectProjectTypeAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE,
  payload: projectType,
});
