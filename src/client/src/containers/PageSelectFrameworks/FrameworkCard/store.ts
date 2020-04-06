import { IOption } from "../../../types/option";

import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../store/combineReducers";
import RootAction from "../../../store/ActionType";
import { IDispatchProps, IStateProps } from "./interfaces";

import { ISelected } from "../../../types/selected";
import { setSelectedFrontendFrameworkAction, setSelectedBackendFrameworkAction } from "../../../store/selection/frameworks/action";
import { updateFrameworksAction } from "../../../store/templates/frameworks/action";
import { ROUTES } from "../../../utils/constants";
import { setPageWizardPageAction, setDetailPageAction } from "../../../store/config/pages/action";

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
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(detailPageInfo, false, ROUTES.SELECT_FRAMEWORKS));
  },
  updateFrameworks: (frameworks: IOption[]) => {
    dispatch(updateFrameworksAction(frameworks));
  }
});

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.config;
  const { frontendFramework, backendFramework } = state.selection;
  return {
    isPreview: previewStatus,
    frontEndSelect: frontendFramework,
    backEndSelect: backendFramework
  };
};

export {mapDispatchToProps, mapStateToProps};