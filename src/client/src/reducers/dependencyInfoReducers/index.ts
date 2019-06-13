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
        installationState: action.payload.installationState
      };
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  dependencyInfo: updateDependencyInfo
});
