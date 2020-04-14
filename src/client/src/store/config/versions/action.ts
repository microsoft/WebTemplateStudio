import { IVersions } from "../../../types/version";
import { IVersionData } from "./model";
import { WIZARD_INFO_TYPEKEYS } from "../../typeKeys";

const getVersionsDataAction = (versions: IVersions): IVersionData => ({
  type: WIZARD_INFO_TYPEKEYS.GET_TEMPLATE_INFO,
  payload: versions
});

export { getVersionsDataAction };
