import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { IOutputPath } from "./model";
import RootAction from "../../ActionType";
import { CONFIG_TYPEKEYS } from "../../config/configTypeKeys";

const initialState = {
  outputPath: "",
  validation: undefined,
};

const outputPathReducer = (state: IOutputPath = initialState, action: RootAction) => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SET_OUTPUT_PATH:
      return {
        ...state,
        outputPath: action.payload,
      };
    case CONFIG_TYPEKEYS.SET_PROJECT_PATH_VALIDATION:
      return {
        ...state,
        validation: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default outputPathReducer;
