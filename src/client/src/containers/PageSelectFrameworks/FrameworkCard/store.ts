import { IOption } from "../../../types/option";

import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../reducers";
import RootAction from "../../../actions/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";

import { ISelected } from "../../../types/selected";
import { setDetailPageAction } from "../../../actions/wizardInfoActions/setDetailsPage";
import { setSelectedFrontendFrameworkAction, setSelectedBackendFrameworkAction } from "../../../store/selection/frameworks/action";
import { updateFrameworksAction } from "../../../store/wizardContent/frameworks/action";

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setFrontendSelect: (framework: ISelected) => {
    dispatch(setSelectedFrontendFrameworkAction(framework));
  },
  setBackendSelect: (framework: ISelected) => {
    dispatch(setSelectedBackendFrameworkAction(framework));
  },
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo));
  },
  updateFrameworks: (frameworks: IOption[]) => {
    dispatch(updateFrameworksAction(frameworks));
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