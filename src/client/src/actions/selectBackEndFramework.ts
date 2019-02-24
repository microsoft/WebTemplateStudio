import { ISelected } from "../types/selected";
import * as Actions from "./types";

const selectBackendFrameworkAction = (backendFramework: ISelected) => ({
  type: Actions.SELECT_BACKEND_FRAMEWORK,
  payload: backendFramework
});

export { selectBackendFrameworkAction };
