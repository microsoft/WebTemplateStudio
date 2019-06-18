import { combineReducers } from "redux";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";

export const initialState = {};

export const updateDependencyInfo = (
  state: any = initialState,
  action: any
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO:
      const newState = { ...state };
      // tslint:disable-next-line: no-string-literal
      newState[action.payload.dependency] = {
        installed: action.payload.installed
      };
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  dependencies: updateDependencyInfo
});
