import { IVersions } from "../../../types/version";
import { IVersionData } from "./model";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";

const getVersionsDataAction = (versions: IVersions): IVersionData => ({
  type: CONFIG_TYPEKEYS.GET_TEMPLATE_INFO,
  payload: versions,
});

export { getVersionsDataAction };
