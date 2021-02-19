import { IValidations } from "./model";
import RootAction from "../../ActionType";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";

const initialState = {
  itemNameValidationConfig: {
    regexs: [],
    reservedNames: [],
    validateEmptyNames: true,
    validateExistingNames: true,
    validateDefaultNames: true,
  },
  projectNameValidationConfig: {
    regexs: [],
    reservedNames: [],
    validateEmptyNames: true,
    validateExistingNames: true,
  },
};

const validationsReducer = (state: IValidations = initialState, action: RootAction) : any => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.SET_VALIDATIONS:
      return action.payload;
    default:
      return state;
  }
};

export default validationsReducer;
