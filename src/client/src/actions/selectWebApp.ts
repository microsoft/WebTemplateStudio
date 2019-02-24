import * as Actions from "./types";
import { ISelected } from "../types/selected";

const selectWebAppAction = (selectedApp: ISelected) => ({
  type: Actions.SELECT_WEB_APP,
  payload: selectedApp
});

export { selectWebAppAction };
