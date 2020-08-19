import { CONFIG_TYPEKEYS } from "../configTypeKeys";

export interface ISelectProjectTypeAction {
  type: CONFIG_TYPEKEYS.SELECT_WEB_APP;
  payload: string;
}