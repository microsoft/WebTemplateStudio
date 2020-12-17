import { CONFIG_TYPEKEYS } from "../configTypeKeys";

export interface ISetPlatformTypeAction {
  type: CONFIG_TYPEKEYS.SET_PLATFORM;
  payload: string;
}
