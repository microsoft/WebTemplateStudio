import * as Actions from "./types";

const updateProjectNameAction = (projectName: string) => ({
  type: Actions.UPDATE_PROJECT_NAME,
  payload: projectName
});

const updateOutputPathAction = (outputPath: string) => ({
  type: Actions.UPDATE_OUTPUT_PATH,
  payload: outputPath
});

export { updateOutputPathAction, updateProjectNameAction };
