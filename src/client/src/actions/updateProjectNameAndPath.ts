import * as Actions from "./types";
import { validateName } from "../utils/validateName";

const updateProjectNameAction = (projectName: string) => {
  const validation = validateName(projectName);
  const projectNameObject = {
    projectName: projectName,
    validation: validation
  };
  return {
    type: Actions.UPDATE_PROJECT_NAME,
    payload: projectNameObject
  };
};

const updateOutputPathAction = (outputPath: string) => ({
  type: Actions.UPDATE_OUTPUT_PATH,
  payload: outputPath
});

export { updateOutputPathAction, updateProjectNameAction };
