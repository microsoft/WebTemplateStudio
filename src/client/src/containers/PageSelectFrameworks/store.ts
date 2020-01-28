import { IOption } from "../../types/option";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { setBackendFrameworks } from "../../actions/wizardContentActions/getBackendFrameworks";
import { setFrontendFrameworks } from "../../actions/wizardContentActions/getFrontendFrameworks";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setBackendFrameworks: (frameworks: IOption[]) => {
    dispatch(setBackendFrameworks(frameworks));
  },
  setFrontendFrameworks: (frameworks: IOption[]) => {
    dispatch(setFrontendFrameworks(frameworks));
  }
});

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus, frontendOptions, backendOptions } = state.wizardContent;
  return {
    isPreview: previewStatus,
    frontendOptions,
    backendOptions,
    vscode: getVSCodeApiSelector(state)
  };
};

export {mapDispatchToProps, mapStateToProps};