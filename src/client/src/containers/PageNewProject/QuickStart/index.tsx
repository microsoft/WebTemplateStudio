import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps, withRouter } from "react-router";
import { FormattedMessage } from "react-intl";

import RootAction from "../../../actions/ActionType";
import { setSelectedFrontendFrameworkAction } from "../../../actions/wizardSelectionActions/selectedFrontendFramework";
import { setSelectedBackendFrameworkAction } from "../../../actions/wizardSelectionActions/selectedBackEndFramework";
import {
  selectPagesAction
} from "../../../actions/wizardSelectionActions/selectPages";
import { setVisitedWizardPageAction } from "../../../actions/wizardInfoActions/setVisitedWizardPage";
import { enableQuickStartAction } from "../../../actions/wizardInfoActions/enableQuickStartAction";

import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { isEnableNextPage } from "../../../selectors/wizardSelectionSelector/wizardSelectionSelector";

import { AppState } from "../../../reducers";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";
import { ISelected } from "../../../types/selected";

import { ReactComponent as QuickStartWand } from "../../../assets/quickStartWand.svg";
import quickStartWand from "../../../assets/quickStartWand.svg";

import {
  FRONT_END_SELECTION,
  BACK_END_SELECTION,
  PAGES_SELECTION
} from "./defaultSelection";

import { getAllFrameworks, getAllPages } from "./loadWizardContent";
import { ROUTES, ROUTES_ARRAY, EXTENSION_COMMANDS } from "../../../utils/constants";

import styles from "./styles.module.css";
import { sendTelemetry } from "../../../utils/extensionService/extensionService";

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
  isEnableNextPage: boolean;
}

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  selectBackendFramework: (backendFramework: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  setRouteVisited: (route: string) => void;
  enableQuickStart: () => void;
}

type Props = IStateProps & IDispatchProps & RouteComponentProps;

class QuickStart extends Component<Props> {
  handleClick = () => {
    const {
      vscode,
      isPreview,
      selectFrontendFramework,
      selectBackendFramework,
      selectPages,
      history,
      setRouteVisited,
      enableQuickStart
    } = this.props;

    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_PRESS_QUICKSTART);
    enableQuickStart();
    getAllFrameworks(vscode, isPreview);
    getAllPages(vscode);
    selectFrontendFramework(FRONT_END_SELECTION);
    selectBackendFramework(BACK_END_SELECTION);
    selectPages(PAGES_SELECTION);
    ROUTES_ARRAY.forEach(route => setRouteVisited(route));
    history.push(ROUTES.REVIEW_AND_GENERATE);
  };

  render() {
    const { isEnableNextPage } = this.props;
    return (
      <div>
        <p className={styles.description}>
          <FormattedMessage
            id="quickStart.optional"
            defaultMessage="OPTIONAL"
          />
        </p>
        <p className={styles.description}>
          <FormattedMessage
            id="quickStart.description"
            defaultMessage='Get started quickly with any frameworks and a blank page by selecting "Quick Start" or click "Next" to go through the entire wizard.'
          />
        </p>
        <button
          tabIndex={0}
          className={styles.quickStart}
          onClick={this.handleClick}
          disabled={!isEnableNextPage}
        >
          <div>
            {quickStartWand && <QuickStartWand className={styles.wand} />}
          </div>
          <div>
            <FormattedMessage
              id="quickStart.button"
              defaultMessage="Quick Start"
            />
          </div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus,
    vscode: getVSCodeApiSelector(state),
    isEnableNextPage: isEnableNextPage(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(setSelectedFrontendFrameworkAction(framework));
  },
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(setSelectedBackendFrameworkAction(backendFramework));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  },
  enableQuickStart: () => {
    dispatch(enableQuickStartAction());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickStart)
);
