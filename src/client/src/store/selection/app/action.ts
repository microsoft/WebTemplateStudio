import { IUpdateProjectNameActionType } from "./model";
import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";

export const updateProjectNameAction = (
  projectName: string, validation: any
): IUpdateProjectNameActionType => {
  const projectNameObject = {
    projectName,
    validation
  };
  return {
    type: WIZARD_SELECTION_TYPEKEYS.UPDATE_PROJECT_NAME,
    payload: projectNameObject
  };
};

export const updateOutputPathAction = (outputPath: string): any => ({
  type: WIZARD_SELECTION_TYPEKEYS.UPDATE_OUTPUT_PATH,
  payload: outputPath
});
