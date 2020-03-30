import { IOption } from "../../../types/option";

import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../store/combineReducers";
import RootAction from "../../../store/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";
import { getVSCodeApiSelector } from "../../../store/vscode/selector";

import { ISelected } from "../../../types/selected";
import { setSelectedFrontendFrameworkAction, setSelectedBackendFrameworkAction } from "../../../store/selection/frameworks/action";
import { updateFrameworksAction } from "../../../store/wizardContent/frameworks/action";
import { setDetailPageAction } from "../../../store/wizardContent/pages/action";

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