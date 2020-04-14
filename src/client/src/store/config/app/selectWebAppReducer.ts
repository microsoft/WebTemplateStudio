import SelectionActionType from "../../selection/selectionActionType";
import { ISelected } from "../../../types/selected";
import { CONFIG_TYPEKEYS } from "../../typeKeys";

const initialState = {
  title: "Fullstack Web Application",
  internalName: "FullStackWebApp",
  version: "v1.0",
  licenses: ""
};

const webAppReducer = (
  state: ISelected = initialState,
  action: SelectionActionType
) => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.SELECT_WEB_APP:
      return action.payload;
    default:
      return state;
  }
};

export default webAppReducer;
