import { PLATFORM } from "../../../utils/constants/constants";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";

export interface ISetPlatformTypeAction {
  type: CONFIG_TYPEKEYS.SET_PLATFORM;
  payload: IPlatform;
}

export interface IPlatform {
  name: PLATFORM;
  requirements: IPlatformRequirement[];
}

export interface IPlatformRequirement {
  name: string;
  isInstalled: boolean;
}
