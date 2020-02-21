import { WIZARD_SELECTION_TYPEKEYS } from "./typeKeys";
import { IProjectName } from "../../reducers/wizardSelectionReducers/updateProjectName";

export interface IUpdateProjectNameActionType {
  type: WIZARD_SELECTION_TYPEKEYS.UPDATE_PROJECT_NAME;
  payload: IProjectName;
}

export interface IUpdateProjectPathActionType {
  type: WIZARD_SELECTION_TYPEKEYS.UPDATE_OUTPUT_PATH;
  payload: string;
}

const updateProjectNameAction = (
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

const updateOutputPathAction = (outputPath: string): any => ({
  type: WIZARD_SELECTION_TYPEKEYS.UPDATE_OUTPUT_PATH,
  payload: outputPath
});

export { updateOutputPathAction, updateProjectNameAction };
