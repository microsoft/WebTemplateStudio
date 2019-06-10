import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";

export interface ISetPortActionType {
  type: WIZARD_CONTENT_TYPEKEYS.SET_PORT;
  payload: number;
}

export const setPortAction = (port: number): ISetPortActionType => ({
  payload: port,
  type: WIZARD_CONTENT_TYPEKEYS.SET_PORT
});
