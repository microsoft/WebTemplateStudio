import { IOption } from "../../../types/option";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";

import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../reducers";
import RootAction from "../../../actions/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { selectFrontendFramework } from "../../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectBackendFrameworkAction } from "../../../actions/wizardSelectionActions/selectBackEndFramework";
import { ISelected } from "../../../types/selected";
import { setDetailPageAction } from "../../../actions/wizardInfoActions/setDetailsPage";
import { updateFrameworks } from "../../../actions/wizardContentActions/updateFrameworks";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setFrontendSelect: (framework: ISelected) => {
    dispatch(selectFrontendFramework(framework));
  },
  setBackendSelect: (framework: ISelected) => {
    dispatch(selectBackendFrameworkAction(framework));
  },
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo));
  },
  updateFrameworks: (frameworks: IOption[]) => {
    dispatch(updateFrameworks(frameworks));
  }
});

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.wizardContent;
  const { frontendFramework, backendFramework } = state.selection;
  return {
    isPreview: previewStatus,
    frontEndSelect: frontendFramework,
    backEndSelect: backendFramework,
    vscode: getVSCodeApiSelector(state)
  };
};

export {mapDispatchToProps, mapStateToProps};