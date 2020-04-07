import { IVersions } from "../../../types/version";
import { WIZARD_INFO_TYPEKEYS } from "../../typeKeys";
import { IVersionData } from "./model";

const getVersionsDataAction = (versions: IVersions): IVersionData => ({
  type: WIZARD_INFO_TYPEKEYS.GET_TEMPLATE_INFO,
  payload: versions
});

export { getVersionsDataAction };
