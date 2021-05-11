import { IVersions } from "../../../types/version";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { IVersionData } from "./model";

const getVersionsDataAction = (versions: IVersions): IVersionData => ({
  type: CONFIG_TYPEKEYS.GET_TEMPLATE_INFO,
  payload: versions,
});

export { getVersionsDataAction };
