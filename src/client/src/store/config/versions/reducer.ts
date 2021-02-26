import { IVersions } from "../../../types/version";
import RootAction from "../../ActionType";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";

const initialState = {
  templatesVersion: "",
  wizardVersion: "",
};

const versions = (state: IVersions = initialState, action: RootAction): any => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.GET_TEMPLATE_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default versions;
