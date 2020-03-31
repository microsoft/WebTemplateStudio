import { AppState } from "../../store/combineReducers";
import { IStateProps, IDispatchProps } from "./interfaces";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../store/ActionType";
import { IDependencyInfoAction } from "../../store/wizardContent/wizardContent/model";
import { updateDependencyInfoAction } from "../../store/wizardContent/wizardContent/action";


const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  updateDependencyInfo: (dependencyInfo: IDependencyInfoAction) => {
    dispatch(updateDependencyInfoAction(dependencyInfo));
  },
});

const mapStateToProps = (state: AppState): IStateProps => {
  const { frontendOptions, backendOptions } = state.wizardContent;
  return {
    frontendOptions,
    backendOptions
  };
};

export {mapStateToProps, mapDispatchToProps};