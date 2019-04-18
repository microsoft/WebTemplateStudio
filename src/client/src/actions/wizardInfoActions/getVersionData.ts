import { IVersions } from "../../types/version";
import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface IVersionData {
  type: WIZARD_INFO_TYPEKEYS.GET_VERSIONS;
  payload: IVersions;
}

const getVersionsDataAction = (versions: IVersions): IVersionData => ({
  type: WIZARD_INFO_TYPEKEYS.GET_VERSIONS,
  payload: versions
});

export { getVersionsDataAction };
