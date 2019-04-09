import * as Actions from "./types";
import { IVersions } from "../types/version";

const getVersionsDataAction = (versions: IVersions) => ({
  type: Actions.GET_VERSIONS,
  payload: versions
});

export { getVersionsDataAction };
