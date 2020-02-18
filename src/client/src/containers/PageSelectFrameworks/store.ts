import { AppState } from "../../reducers";
import { IStateProps, IDispatchProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { IOption } from "../../types/option";
import { setFrontendFrameworksAction } from "../../actions/wizardContentActions/setFrontendFrameworks";
import { setBackendFrameworksAction } from "../../actions/wizardContentActions/setBackendFrameworks";


const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setBackendFrameworks: (frameworks: IOption[]) => {
    dispatch(setBackendFrameworksAction(frameworks));
  },
  setFrontendFrameworks: (frameworks: IOption[]) => {
    dispatch(setFrontendFrameworksAction(frameworks));
  }
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