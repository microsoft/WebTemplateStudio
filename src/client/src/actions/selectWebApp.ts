import { ISelected } from "../types/selected";
import * as Actions from "./types";

const selectWebAppAction = (selectedApp: ISelected) => ({
  type: Actions.SELECT_WEB_APP,
  payload: selectedApp
});

export { selectWebAppAction };
