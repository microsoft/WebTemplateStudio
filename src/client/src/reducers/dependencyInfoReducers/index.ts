import { combineReducers } from "redux";
import { WIZARD_INFO_TYPEKEYS } from "../../actions/wizardInfoActions/typeKeys";
import { IUpdateDependencyInfo } from "../../actions/wizardInfoActions/updateDependencyInfo";

interface IDependencyInstalled {
  installed: boolean;
}

export interface IDependenciesInstalled {
  [key: string]: IDependencyInstalled;
}

export const initialState = {};

export const updateDependencyInfo = (
  state: IDependenciesInstalled = initialState,
  action: IUpdateDependencyInfo
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
