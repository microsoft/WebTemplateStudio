import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps, withRouter } from "react-router";

import RootAction from "../../actions/ActionType";
import { selectFrontendFramework as selectFrontendAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import { selectPagesAction } from "../../actions/wizardSelectionActions/selectPages";
import { setVisitedWizardPageAction } from "../../actions/wizardInfoActions/setVisitedWizardPage";

import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";

import { AppState } from "../../reducers";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { ISelected } from "../../types/selected";

import {
  FRONT_END_SELECTION,
  BACK_END_SELECTION,
  PAGES_SELECTION
} from "./defaultSelection";

import { getAllFrameworks, getAllPages } from "./loadWizardContent";
import { ROUTES, ROUTES_ARRAY } from "../../utils/constants";

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
  isValidNameAndProjectPath: boolean;
}

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  selectBackendFramework: (backendFramework: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  setRouteVisited: (route: string) => void;
}

type Props = IStateProps & IDispatchProps & RouteComponentProps;

class QuickStart extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      vscode,
      isPreview,
      selectFrontendFramework,
      selectBackendFramework,
      selectPages,
      history,
      setRouteVisited
    } = this.props;

    getAllFrameworks(vscode, isPreview);
    getAllPages(vscode);
    selectFrontendFramework(FRONT_END_SELECTION);
    selectBackendFramework(BACK_END_SELECTION);
    selectPages(PAGES_SELECTION);
    ROUTES_ARRAY.forEach(route => setRouteVisited(route));
    history.push(ROUTES.REVIEW_AND_GENERATE);
  }

  render() {
    const { isValidNameAndProjectPath } = this.props;
    return (
      <button onClick={this.handleClick} disabled={!isValidNameAndProjectPath}>
        Quick Start
      </button>
    );
  }
}

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus,
    vscode: getVSCodeApiSelector(state),
    isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(selectFrontendAction(framework));
  },
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(selectBackendFrameworkAction(backendFramework));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickStart)
);
