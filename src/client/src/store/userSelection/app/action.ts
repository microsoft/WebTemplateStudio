import { ISetProjectNameActionType } from "./model";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";

export const setProjectNameAction = (projectName: string, validation: any): ISetProjectNameActionType => {
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
