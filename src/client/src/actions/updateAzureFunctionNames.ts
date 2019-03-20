import * as Actions from "./types";

const updateAzureFunctionNamesAction = (functionApp: { appIndex: number, functionNames: string[] }) => ({
  type: Actions.UPDATE_AZURE_FUNCTION_NAMES,
  payload: functionApp
});

export { updateAzureFunctionNamesAction };
