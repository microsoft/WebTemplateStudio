import { AppState } from "../../store/combineReducers";
import { IStateProps, IDispatchProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../store/ActionType";
import { IDependencyInfo } from "../../store/wizardContent/wizardContent/model";
import { updateDependencyInfoAction } from "../../store/wizardContent/wizardContent/action";


const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  updateDependencyInfo: (dependencyInfo: IDependencyInfo) => {
    dispatch(updateDependencyInfoAction(dependencyInfo));
  },
});

const mapStateToProps = (state: AppState): IStateProps => {
  const { frontendOptions, backendOptions } = state.wizardContent;
  return {
    frontendOptions,
    backendOptions,
    vscode: getVSCodeApiSelector(state)
  };
};

export {mapStateToProps, mapDispatchToProps};