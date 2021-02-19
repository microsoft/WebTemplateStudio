import { ISetProjectNameActionType } from "./model";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { IValidation } from "../../../utils/validations/validations";

export const setProjectNameAction = (projectName: string, validation: IValidation): ISetProjectNameActionType => {
  const projectNameObject = {
    projectName,
    validation,
  };
  return {
    type: USERSELECTION_TYPEKEYS.SET_PROJECT_NAME,
    payload: projectNameObject,
  };
};

export const setOutputPathAction = (outputPath: string): any => ({
  type: USERSELECTION_TYPEKEYS.SET_OUTPUT_PATH,
  payload: outputPath,
});
