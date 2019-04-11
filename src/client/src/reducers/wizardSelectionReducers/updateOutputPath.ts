import * as Actions from "../../actions/types";
import { FormattedMessage } from "react-intl";

/* State Shape
{
    outputPath: string,
    validation: {
      isValid: false,
      error: string
    }
}
*/

export interface IValidation {
  isValid: boolean;
  error: string | FormattedMessage.MessageDescriptor;
}

export interface IOutputPath {
  outputPath: string;
  validation?: IValidation;
}

const initialState = {
  outputPath: "",
  validation: undefined
};

const outputPathReducer = (state: IOutputPath = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_OUTPUT_PATH:
      return {
        ...state,
        outputPath: action.payload
      };
    case Actions.SET_PROJECT_PATH_VALIDATION:
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
