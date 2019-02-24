import { ISelected } from "../types/selected";
import * as Actions from "./types";

const selectFrontendFramework = (frontendFramework: ISelected) => ({
  type: Actions.SELECT_FRONTEND_FRAMEWORK,
  payload: frontendFramework
});

export { selectFrontendFramework };
