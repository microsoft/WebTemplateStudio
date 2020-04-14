import { IVersions } from "../../../types/version";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";

export interface IVersionData {
  type: CONFIG_TYPEKEYS.GET_TEMPLATE_INFO;
  payload: IVersions;
}