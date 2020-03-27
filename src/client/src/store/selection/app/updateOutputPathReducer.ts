import WizardSelectionActionType from "../selectionActionType";
import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { IOutputPath } from "./model";

const initialState = {
  outputPath: "",
  validation: undefined
};

const outputPathReducer = (
  state: IOutputPath = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SET_OUTPUT_PATH:
      return {
        ...state,
        outputPath: action.payload
      };
    case WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION:
      return {
        ...state,
        validation: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default outputPathReducer;
